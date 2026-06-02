#!/bin/bash
set -e

REGISTRY_IP="172.17.16.48:5000"
RETRY_MAX=32  # 最多重试 32 次
RETRY_DELAY=5  # 每次重试间隔 5 秒
CLEANUP_ENABLED=true  # 推送完成后是否清除无用镜像（dangling images）

GREEN="\033[32m"
NC="\033[0m"

# 重试函数（核心！）
retry_push() {
  local image=$1
  local count=1
  while [ $count -le $RETRY_MAX ]; do
    echo -e "${GREEN}📤 推送第 $count 次: $image${NC}"
    if docker push $image; then
      echo -e "${GREEN}✅ 推送成功！${NC}"
      return 0
    else
      echo -e "❌ 推送失败（第 $count 次），${RETRY_DELAY}秒后重试..."
      sleep $RETRY_DELAY
      ((count++))
    fi
  done
  echo -e "💥 超过最大重试次数，推送失败！"
  return 1
}

echo -e "${GREEN}🚀 构建镜像...${NC}"
# DOCKER_BUILDKIT=0 docker-compose build server admin
docker-compose build server admin

echo -e "${GREEN}🏷 打标签...${NC}"
docker tag yunhe-vue/server:latest ${REGISTRY_IP}/yunhe-vue/server:latest
docker tag yunhe-vue/admin:latest ${REGISTRY_IP}/yunhe-vue/admin:latest

echo -e "${GREEN}📤 开始推送 server 镜像...${NC}"
retry_push "${REGISTRY_IP}/yunhe-vue/server:latest"

sleep 5  # 间隔 5 秒，给网络喘息时间

echo -e "${GREEN}📤 开始推送 admin 镜像...${NC}"
retry_push "${REGISTRY_IP}/yunhe-vue/admin:latest"

echo -e "${GREEN}🎉 全部推送完成！宝塔直接部署！${NC}"

if [ "$CLEANUP_ENABLED" = "true" ]; then
  echo -e "${GREEN}🧹 清除无用镜像...${NC}"
  docker image prune -f
  echo -e "${GREEN}✅ 清除完成${NC}"
fi