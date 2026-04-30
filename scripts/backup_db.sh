#!/bin/bash
# 数据库备份脚本

# 配置项
COMPRESS="true"              # 是否压缩备份文件 (true/false)
BACKUP_DIR="backups"         # 备份文件存放目录
CLEAN_OLD_BACKUPS="true"     # 是否自动清理旧备份 (true/false)
RETENTION_DAYS="7"           # 保留备份天数

# 获取当前时间戳
TIMESTAMP=$(date +%Y%m%d%H%M%S)

# 从 .env 安全读取配置（防空格、防异常）
MYSQL_PASSWORD=$(grep '^MYSQL_PASSWORD=' .env | cut -d'=' -f2- | xargs)
MYSQL_DATABASE=$(grep '^MYSQL_DATABASE=' .env | cut -d'=' -f2- | xargs)

# 检查配置是否完整（仅控制台输出）
if [ -z "${MYSQL_PASSWORD}" ] || [ -z "${MYSQL_DATABASE}" ]; then
    echo "❌ 错误：请在 .env 文件中配置 MYSQL_PASSWORD 和 MYSQL_DATABASE"
    exit 1
fi

# 创建备份目录
mkdir -p ${BACKUP_DIR}

# 根据压缩配置执行备份
if [ "${COMPRESS}" = "true" ]; then
    # 带压缩备份
    BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql.gz"
    docker-compose exec -T mysql mysqldump -u root -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}" | gzip > "${BACKUP_FILE}"
    echo "✅ 备份完成！文件: ${BACKUP_FILE} (已压缩)"
else
    # 不压缩备份
    BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"
    docker-compose exec -T mysql mysqldump -u root -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE}" > "${BACKUP_FILE}"
    echo "✅ 备份完成！文件: ${BACKUP_FILE} (未压缩)"
fi

# 自动清理旧备份
if [ "${CLEAN_OLD_BACKUPS}" = "true" ]; then
    echo "🔄 正在清理 ${RETENTION_DAYS} 天前的旧备份..."
    find "${BACKUP_DIR}" -name "backup_*.sql*" -type f -mtime +${RETENTION_DAYS} -delete
    echo "✅ 清理完成"
fi