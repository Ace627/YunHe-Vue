/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50744
 Source Host           : localhost:3306
 Source Schema         : yunhe

 Target Server Type    : MySQL
 Target Server Version : 50744
 File Encoding         : 65001

 Date: 28/04/2026 11:15:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dict_label` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典标签',
  `dict_value` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典值',
  `dict_sort` int(11) NOT NULL DEFAULT 1 COMMENT '排序',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `dict_type_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典类型',
  `list_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '表格回显样式',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 02:05:25.582744', '2026-04-26 02:05:25.582744', 'admin', 'admin', '03650518-a9ca-470e-a568-1e4b16d1c486', '默认分组', 'DEFAULT', 1, '1', '默认分组', 'b8849a88-e972-42fc-9b87-75f0c8d18157', 'sys_job_group', NULL);
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 21:56:40.564404', '2026-04-26 00:12:37.000000', 'admin', 'admin', '059632a3-5c6c-4e2e-9cb0-8e305a4c3750', '导出', '6', 6, '1', '导出操作', 'da04de16-1667-47cf-916d-13716ed651a2', 'sys_oper_type', 'warning');
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 21:55:53.656981', '2026-04-26 00:12:19.000000', 'admin', 'admin', '091ac304-a43b-4564-8c60-a2a70f1bd52e', '删除', '3', 3, '1', '删除操作', 'da04de16-1667-47cf-916d-13716ed651a2', 'sys_oper_type', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 22:01:25.164522', '2026-04-26 01:37:09.000000', 'admin', 'admin', '0ab42d49-d246-496b-9f06-52d40dc46314', '停用', '0', 2, '1', '停用状态', '8ab1bfca-3b61-4708-b7eb-202732db1ac1', 'sys_normal_disable', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 02:28:58.378019', '2026-04-26 02:28:58.378019', 'admin', 'admin', '27c0f923-3805-45a8-b7d0-833c9edef72a', '隐藏', '0', 2, '1', '菜单侧栏隐藏', '2092c5ba-54ed-4d88-aadc-02bd8d65644f', 'sys_menu_visible', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 21:56:09.099594', '2026-04-26 00:12:24.000000', 'admin', 'admin', '330e9abf-5237-4a95-b3e7-7f7b4bf84844', '清空', '4', 4, '1', '清空操作', 'da04de16-1667-47cf-916d-13716ed651a2', 'sys_oper_type', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2026-04-20 04:48:02.938037', '2026-04-26 01:57:24.000000', 'admin', 'admin', '36644392-be54-4c54-a3d0-fe93ebf4d2d2', '成功', '1', 1, '1', '成功状态', '4e72f93b-9051-4c0b-bbb6-7fd833c2555b', 'sys_common_status', 'primary');
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 21:56:24.075431', '2026-04-26 00:12:30.000000', 'admin', 'admin', '447796f1-27e6-4bea-8ebb-bc1e53a021f2', '强退', '5', 5, '1', '强退操作', 'da04de16-1667-47cf-916d-13716ed651a2', 'sys_oper_type', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 02:28:41.900461', '2026-04-26 02:28:41.900461', 'admin', 'admin', '9093966a-f3ac-42a0-b007-4e1e8e45b1a5', '显示', '1', 1, '1', '菜单侧栏显示', '2092c5ba-54ed-4d88-aadc-02bd8d65644f', 'sys_menu_visible', 'primary');
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 02:04:31.785571', '2026-04-26 02:04:31.785571', 'admin', 'admin', '98f6b84f-bfe9-4e4f-9bdc-d618b1c61067', '暂停', '0', 2, '1', '暂停状态', '6821fa61-5032-4d68-85a6-ddce61716386', 'sys_job_status', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 01:44:42.287330', '2026-04-26 01:44:42.287330', 'admin', 'admin', 'a24a6b5c-9378-481b-9419-931f690cbc60', '女', '1', 2, '1', '性别女', '1cf7d66a-1119-428f-b1cd-16d103b9a932', 'sys_user_gender', NULL);
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 21:55:08.830102', '2026-04-26 00:12:04.000000', 'admin', 'admin', 'a42483c1-6d59-43e6-8a77-35417d412fa7', '新增', '1', 1, '1', '新增操作', 'da04de16-1667-47cf-916d-13716ed651a2', 'sys_oper_type', 'info');
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 21:55:39.622294', '2026-04-26 00:12:10.000000', 'admin', 'admin', 'a6f53fa4-90c3-4737-8dda-b9b9c72142bb', '修改', '2', 2, '1', '修改操作', 'da04de16-1667-47cf-916d-13716ed651a2', 'sys_oper_type', 'info');
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 01:44:19.128474', '2026-04-26 01:44:19.128474', 'admin', 'admin', 'a8e265ea-98a0-4fc5-976d-6c1bf4d3a131', '男', '0', 1, '1', '	\n性别男', '1cf7d66a-1119-428f-b1cd-16d103b9a932', 'sys_user_gender', NULL);
INSERT INTO `sys_dict_data` VALUES ('2026-04-20 04:48:16.924791', '2026-04-26 01:57:27.000000', 'admin', 'admin', 'bca4e85d-5cd7-4f7f-b5c9-09d5cb869f65', '失败', '0', 2, '1', '失败状态', '4e72f93b-9051-4c0b-bbb6-7fd833c2555b', 'sys_common_status', 'danger');
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 01:44:56.903460', '2026-04-26 01:44:56.903460', 'admin', 'admin', 'd1f9b46c-10de-4dd3-b2c5-1862b6b5103a', '未知', '2', 3, '1', '性别未知', '1cf7d66a-1119-428f-b1cd-16d103b9a932', 'sys_user_gender', NULL);
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 22:01:10.880780', '2026-04-26 01:37:12.000000', 'admin', 'admin', 'd30dcaea-b7f3-40fa-b825-b49437fee7d8', '正常', '1', 1, '1', '正常状态', '8ab1bfca-3b61-4708-b7eb-202732db1ac1', 'sys_normal_disable', 'primary');
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 02:05:46.826895', '2026-04-26 02:05:46.826895', 'admin', 'admin', 'd38206f0-cd99-4cea-a858-0d8d85427f43', '系统分组', 'SYSTEM', 2, '1', '系统分组', 'b8849a88-e972-42fc-9b87-75f0c8d18157', 'sys_job_group', NULL);
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 02:04:06.432354', '2026-04-26 02:04:06.432354', 'admin', 'admin', 'e5827acf-7e8d-4d6b-a39a-707af2f44af2', '正常', '1', 1, '1', '正常状态', '6821fa61-5032-4d68-85a6-ddce61716386', 'sys_job_status', 'primary');
INSERT INTO `sys_dict_data` VALUES ('2026-04-21 21:54:49.555544', '2026-04-26 00:12:43.000000', 'admin', 'admin', 'fd503e74-72cb-4218-9761-c5e58a18369b', '其它', '0', 99, '1', '其它操作', 'da04de16-1667-47cf-916d-13716ed651a2', 'sys_oper_type', 'info');

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dict_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典名称',
  `dict_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_f4e4273658733a3bbe6a2479bf`(`dict_type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES ('2026-04-26 01:43:16.497197', '2026-04-26 01:43:16.497197', 'admin', 'admin', '1cf7d66a-1119-428f-b1cd-16d103b9a932', '用户性别', 'sys_user_gender', '1', '用户性别列表');
INSERT INTO `sys_dict_type` VALUES ('2026-04-26 02:28:22.163277', '2026-04-26 02:28:22.163277', 'admin', 'admin', '2092c5ba-54ed-4d88-aadc-02bd8d65644f', '菜单显隐', 'sys_menu_visible', '1', '菜单显隐列表');
INSERT INTO `sys_dict_type` VALUES ('2026-04-20 04:34:50.882849', '2026-04-20 17:17:19.000000', 'admin', 'admin', '4e72f93b-9051-4c0b-bbb6-7fd833c2555b', '系统状态', 'sys_common_status', '1', '系统状态列表');
INSERT INTO `sys_dict_type` VALUES ('2026-04-26 02:03:42.902823', '2026-04-26 02:03:42.902823', 'admin', 'admin', '6821fa61-5032-4d68-85a6-ddce61716386', '任务状态', 'sys_job_status', '1', '任务状态列表');
INSERT INTO `sys_dict_type` VALUES ('2026-04-21 22:00:02.965176', '2026-04-21 22:00:02.965176', 'admin', 'admin', '8ab1bfca-3b61-4708-b7eb-202732db1ac1', '系统开关', 'sys_normal_disable', '1', '系统开关列表');
INSERT INTO `sys_dict_type` VALUES ('2026-04-26 02:04:54.226160', '2026-04-26 02:04:54.226160', 'admin', 'admin', 'b8849a88-e972-42fc-9b87-75f0c8d18157', '任务分组', 'sys_job_group', '1', '任务分组列表');
INSERT INTO `sys_dict_type` VALUES ('2026-04-21 21:53:40.882517', '2026-04-21 21:59:01.000000', 'admin', 'admin', 'da04de16-1667-47cf-916d-13716ed651a2', '操作类型', 'sys_oper_type', '1', '操作类型列表');

-- ----------------------------
-- Table structure for sys_job
-- ----------------------------
DROP TABLE IF EXISTS `sys_job`;
CREATE TABLE `sys_job`  (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DEFAULT' COMMENT '任务组名',
  `invoke_target` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '调用目标字符串',
  `cron_expression` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'cron执行表达式',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `misfire_policy` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '3' COMMENT '计划执行错误策略',
  `concurrent` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '是否并发执行',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_job
-- ----------------------------
INSERT INTO `sys_job` VALUES ('2026-04-25 13:45:13.263668', '2026-04-28 11:14:37.000000', 'admin', 'admin', 'df3c4304-4946-45d9-9376-c45ef333150d', '测试', 'DEFAULT', 'JobService.test()', '* * * * * *', '0', '1', '0');

-- ----------------------------
-- Table structure for sys_job_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_job_log`;
CREATE TABLE `sys_job_log`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DEFAULT' COMMENT '任务组名',
  `invoke_target` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '调用目标字符串',
  `job_message` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '日志信息',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_job_log
-- ----------------------------
INSERT INTO `sys_job_log` VALUES ('275beb52-668f-44d3-9c51-211d7c9dfe3f', '测试', 'DEFAULT', 'JobService.test()', '执行成功', '1', '2026-04-28 11:14:35');
INSERT INTO `sys_job_log` VALUES ('3cd0b442-4982-4f24-b898-5f7fe823a7cd', '测试', 'DEFAULT', 'JobService.test()', '执行成功', '1', '2026-04-28 11:14:34');
INSERT INTO `sys_job_log` VALUES ('54ba0da3-5405-40db-a52b-cb66df9303d2', '测试', 'DEFAULT', 'JobService.test()', '执行成功', '1', '2026-04-28 11:14:36');

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '访问ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户账号',
  `ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '登录IP地址',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '登录地点',
  `browser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '浏览器类型',
  `os` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '操作系统',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '登录状态',
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '提示消息',
  `login_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '登录日期',
  `request_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '请求唯一标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '上级菜单',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '路由地址',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '组件路径',
  `menu_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'M' COMMENT '类型（M目录 C菜单 F按钮）',
  `icon` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '菜单图标',
  `menu_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '菜单名称',
  `visible` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '菜单是否可见',
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '权限字符',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '数据状态',
  `menu_sort` int(11) NOT NULL DEFAULT 1 COMMENT '显示顺序',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `is_cache` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '是否缓存组件',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:11:39.612401', '2026-04-22 18:11:39.612401', 'admin', 'admin', '07848a5b-661b-421b-802d-2263f507a0a1', 'f1a5d7b6-86e4-408a-a2f1-7e08a1472058', NULL, NULL, 'F', NULL, '菜单新增', '1', 'system:menu:create', '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:11:56.772858', '2026-04-22 18:11:56.772858', 'admin', 'admin', '09bcd942-a1ed-49b5-9975-a8c781087398', 'f1a5d7b6-86e4-408a-a2f1-7e08a1472058', NULL, NULL, 'F', NULL, '菜单删除', '1', 'system:menu:delete', '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:13:25.097826', '2026-04-22 18:13:25.097826', 'admin', 'admin', '11a5501d-8f7e-4ccb-87bc-aaf0c3fe37ba', '724fe5d0-d104-4d35-b1bc-ff5bfb4ca066', NULL, NULL, 'F', NULL, '字典删除', '1', 'system:dict:delete', '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 13:00:24.642759', '2026-04-25 13:00:24.642759', 'admin', 'admin', '14575a54-7305-4de8-a68d-f982ed351e87', '2db234ff-ad75-4b4f-8d46-b3ea13b506b0', NULL, NULL, 'F', NULL, '登录日志删除', '1', 'monitor:logininfor:delete', '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 02:25:14.800525', '2026-04-25 02:25:14.800525', 'admin', 'admin', '184bd2a2-5396-4cc2-b099-fda1e1f3784d', '5ddd2884-3d0c-43a0-abfb-4b0efac62d30', NULL, NULL, 'F', NULL, '任务编辑', '1', 'monitor:job:update', '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 13:01:24.267847', '2026-04-25 13:01:24.267847', 'admin', 'admin', '263b753d-6bbc-4a51-bee2-cd9795792300', '4c4f25fd-3037-4aee-ae9b-91edccdf7792', NULL, NULL, 'F', NULL, '操作日志删除', '1', 'monitor:operlog:delete', '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:15:56.146227', '2026-04-22 18:15:56.146227', 'admin', 'admin', '276cdb30-1167-4c71-85a6-86a5a75f1e8b', 'd7dc7db2-bb66-484e-8f90-53d731ea5a57', 'online', 'monitor/online/index', 'C', 'Online', '在线用户', '1', NULL, '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:23:27.351383', '2026-04-22 18:23:27.351383', 'admin', 'admin', '2bd7fb00-d6ae-4444-9d69-dc833a3e725f', 'f66ee797-1b85-412c-a1fb-f3aa90a0387b', 'lazyimg', 'example/ImageLazyLoad', 'C', 'Image', '图片懒加载', '1', NULL, '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:06:11.091525', '2026-04-22 18:07:15.000000', 'admin', 'admin', '2d407543-5a92-4f82-b836-2643317dd918', 'b254fc65-60a6-4f74-8bf6-345c23000ba3', NULL, NULL, 'F', NULL, '用户编辑', '1', 'system:user:update', '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:20:36.798732', '2026-04-24 18:00:53.000000', 'admin', 'admin', '2db234ff-ad75-4b4f-8d46-b3ea13b506b0', '3c904fde-7455-437b-9657-e95629c799cd', 'logininfor', 'monitor/logininfor/index', 'C', 'Logininfor', '登录日志', '1', NULL, '1', 5, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 17:50:24.299654', '2026-04-22 17:50:24.299654', 'admin', 'admin', '3c904fde-7455-437b-9657-e95629c799cd', '0', 'system', NULL, 'M', 'Setting', '系统管理', '1', NULL, '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 13:01:37.117659', '2026-04-25 13:01:37.117659', 'admin', 'admin', '415a6369-6643-4f95-98da-671348ea148b', '4c4f25fd-3037-4aee-ae9b-91edccdf7792', NULL, NULL, 'F', NULL, '操作日志清空', '1', 'monitor:operlog:clear', '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:09:17.387307', '2026-04-22 18:09:17.387307', 'admin', 'admin', '42ce5cc6-4d3c-41fe-b48f-20bac793b0d6', 'e7b367dd-61ab-465d-8c6f-bf8819bbdde3', NULL, NULL, 'F', NULL, '角色查询', '1', 'system:role:query', '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 02:25:29.395759', '2026-04-25 02:25:29.395759', 'admin', 'admin', '4bd126da-978a-4198-a1c0-cdc2e7051b7d', '5ddd2884-3d0c-43a0-abfb-4b0efac62d30', NULL, NULL, 'F', NULL, '任务删除', '1', 'monitor:job:delete', '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:21:06.817798', '2026-04-24 18:00:57.000000', 'admin', 'admin', '4c4f25fd-3037-4aee-ae9b-91edccdf7792', '3c904fde-7455-437b-9657-e95629c799cd', 'operlog', 'monitor/operlog/index', 'C', 'Log', '操作日志', '1', NULL, '1', 6, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 13:01:51.174051', '2026-04-25 13:01:51.174051', 'admin', 'admin', '4c580309-c10e-42af-835b-18f0056bc06d', '4c4f25fd-3037-4aee-ae9b-91edccdf7792', NULL, NULL, 'F', NULL, '操作日志导出', '1', 'monitor:operlog:export', '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 13:00:55.153717', '2026-04-25 13:00:55.153717', 'admin', 'admin', '54084b09-7f45-4c6b-b01b-0a40ef350dee', '2db234ff-ad75-4b4f-8d46-b3ea13b506b0', NULL, NULL, 'F', NULL, '登录日志导出', '1', 'monitor:logininfor:export', '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 13:01:09.452401', '2026-04-25 13:01:09.452401', 'admin', 'admin', '5cf5bfbb-a5d2-4fb9-8c71-47c2d01936bb', '4c4f25fd-3037-4aee-ae9b-91edccdf7792', NULL, NULL, 'F', NULL, '操作日志查询', '1', 'monitor:operlog:query', '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-24 23:52:29.060269', '2026-04-24 23:53:05.000000', 'admin', 'admin', '5ddd2884-3d0c-43a0-abfb-4b0efac62d30', 'd7dc7db2-bb66-484e-8f90-53d731ea5a57', 'job', 'monitor/job/index', 'C', 'Schedule', '定时任务', '1', NULL, '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 02:25:04.285759', '2026-04-25 02:25:04.285759', 'admin', 'admin', '605e8a35-795d-45b7-94b1-cde26608224d', '5ddd2884-3d0c-43a0-abfb-4b0efac62d30', NULL, NULL, 'F', NULL, '任务新增', '1', 'monitor:job:create', '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:19:39.235367', '2026-04-24 23:51:23.000000', 'admin', 'admin', '645995d5-ba47-4b2e-9c96-23d018e46ba3', 'd7dc7db2-bb66-484e-8f90-53d731ea5a57', 'cache/list', 'monitor/cache/list', 'C', 'CacheList', '缓存列表', '1', NULL, '1', 5, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:12:33.508671', '2026-04-22 18:12:33.508671', 'admin', 'admin', '724fe5d0-d104-4d35-b1bc-ff5bfb4ca066', '3c904fde-7455-437b-9657-e95629c799cd', 'dict', 'system/dict/index', 'C', 'Dict', '字典管理', '1', NULL, '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:07:44.243174', '2026-04-22 18:07:44.243174', 'admin', 'admin', '75314fe5-9de0-4d06-a64e-e1a2acda4cab', 'b254fc65-60a6-4f74-8bf6-345c23000ba3', NULL, NULL, 'F', NULL, '用户删除', '1', 'system:user:delete', '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:09:25.637405', '2026-04-22 18:09:25.637405', 'admin', 'admin', '7600becb-6fc6-4867-860b-8132b47c0082', 'e7b367dd-61ab-465d-8c6f-bf8819bbdde3', NULL, NULL, 'F', NULL, '角色新增', '1', 'system:role:create', '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:13:01.990107', '2026-04-22 18:13:01.990107', 'admin', 'admin', '7ade8b4f-dc87-4406-826f-be66a253f971', '724fe5d0-d104-4d35-b1bc-ff5bfb4ca066', NULL, NULL, 'F', NULL, '字典新增', '1', 'system:dict:create', '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:22:41.393424', '2026-04-22 18:22:41.393424', 'admin', 'admin', '83e4eecf-5ef2-461f-9943-8ff7e4600656', 'f66ee797-1b85-412c-a1fb-f3aa90a0387b', 'taichi', 'example/TaiChi', 'C', 'TaiChi', '旋转太极图', '1', NULL, '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:18:15.132872', '2026-04-24 23:51:05.000000', 'admin', 'admin', '868a41a9-4b98-4c61-bdfa-830000dec5d9', 'd7dc7db2-bb66-484e-8f90-53d731ea5a57', 'server', 'monitor/server/index', 'C', 'Server', '服务监控', '1', NULL, '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:12:48.838774', '2026-04-22 18:12:48.838774', 'admin', 'admin', '8eada0a9-ddbe-4c07-974c-e8e90f60effe', '724fe5d0-d104-4d35-b1bc-ff5bfb4ca066', NULL, NULL, 'F', NULL, '字典查询', '1', 'system:dict:query', '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:13:10.199338', '2026-04-22 18:13:10.199338', 'admin', 'admin', '9c13033c-860e-4b1a-b7c8-775286c2c531', '724fe5d0-d104-4d35-b1bc-ff5bfb4ca066', NULL, NULL, 'F', NULL, '字典编辑', '1', 'system:dict:update', '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:09:33.638196', '2026-04-22 18:09:33.638196', 'admin', 'admin', 'a008effd-4b39-415b-a89a-6cbb2602280f', 'e7b367dd-61ab-465d-8c6f-bf8819bbdde3', NULL, NULL, 'F', NULL, '角色编辑', '1', 'system:role:update', '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:09:43.449505', '2026-04-22 18:09:43.449505', 'admin', 'admin', 'aaa92de8-0e3f-40ce-b18b-932b42e83241', 'e7b367dd-61ab-465d-8c6f-bf8819bbdde3', NULL, NULL, 'F', NULL, '角色删除', '1', 'system:role:delete', '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 13:00:03.866942', '2026-04-25 13:00:03.866942', 'admin', 'admin', 'adb1be50-5017-4c30-a536-fc0d5b53904a', '2db234ff-ad75-4b4f-8d46-b3ea13b506b0', NULL, NULL, 'F', NULL, '登录日志查询', '1', 'monitor:logininfor:query', '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-28 02:05:37.322124', '2026-04-28 02:05:37.322124', 'admin', 'admin', 'aee9d7f9-728b-47c1-bec5-7a53b7e5dfcc', 'd7dc7db2-bb66-484e-8f90-53d731ea5a57', 'health', 'monitor/health/index', 'C', 'Tool', '系统健康', '1', NULL, '1', 6, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 17:51:05.224632', '2026-04-22 17:58:28.000000', 'admin', 'admin', 'b254fc65-60a6-4f74-8bf6-345c23000ba3', '3c904fde-7455-437b-9657-e95629c799cd', 'user', 'system/user/index', 'C', 'User', '用户管理', '1', NULL, '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:17:09.081560', '2026-04-22 18:17:09.081560', 'admin', 'admin', 'ba46fe67-c503-4edc-a598-e757a4205027', '276cdb30-1167-4c71-85a6-86a5a75f1e8b', NULL, NULL, 'F', NULL, '在线用户强退', '1', 'monitor:online:forceLogout', '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 13:00:37.717744', '2026-04-25 13:00:37.717744', 'admin', 'admin', 'bad67e55-576c-452b-85af-16ddf43328d0', '2db234ff-ad75-4b4f-8d46-b3ea13b506b0', NULL, NULL, 'F', NULL, '登录日志清空', '1', 'monitor:logininfor:clear', '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:11:26.893843', '2026-04-22 18:11:26.893843', 'admin', 'admin', 'bafe0cf3-0ef3-4cb6-9042-0d7e7eef72bc', 'f1a5d7b6-86e4-408a-a2f1-7e08a1472058', NULL, NULL, 'F', NULL, '菜单查询', '1', 'system:menu:query', '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-23 14:57:48.255496', '2026-04-23 15:31:36.000000', 'admin', 'admin', 'bbe5d132-8bf0-4d9f-ba20-d739f638a449', 'f66ee797-1b85-412c-a1fb-f3aa90a0387b', 'markdown', 'example/Markdown', 'C', 'Markdown', 'Markdown', '1', NULL, '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:11:47.477813', '2026-04-22 18:11:47.477813', 'admin', 'admin', 'c0bb9842-2a96-471c-933a-139f7cbfa5ad', 'f1a5d7b6-86e4-408a-a2f1-7e08a1472058', NULL, NULL, 'F', NULL, '菜单编辑', '1', 'system:menu:update', '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:04:52.645251', '2026-04-22 18:04:52.645251', 'admin', 'admin', 'c83c49c9-b1ef-4c55-8cc0-fe25efbf8e41', 'b254fc65-60a6-4f74-8bf6-345c23000ba3', NULL, NULL, 'F', NULL, '用户查询', '1', 'system:user:query', '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:14:16.022700', '2026-04-24 18:01:13.000000', 'admin', 'admin', 'ca76a64f-e632-42a9-aada-74a51524c31e', '3c904fde-7455-437b-9657-e95629c799cd', 'icon', 'system/icon/index', 'C', 'Earth', '图标管理', '1', NULL, '1', 9, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:15:12.441275', '2026-04-22 18:15:12.441275', 'admin', 'admin', 'd7dc7db2-bb66-484e-8f90-53d731ea5a57', '0', 'monitor', NULL, 'M', 'Monitor', '系统监控', '1', NULL, '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 14:26:09.108444', '2026-04-25 14:26:09.108444', 'admin', 'admin', 'd94e39b2-a6b8-4df8-a39c-dd7bd2ae33a2', '5ddd2884-3d0c-43a0-abfb-4b0efac62d30', NULL, NULL, 'F', NULL, '任务清空', '1', 'monitor:job:clear', '1', 5, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:08:50.276077', '2026-04-22 18:08:50.276077', 'admin', 'admin', 'e7b367dd-61ab-465d-8c6f-bf8819bbdde3', '3c904fde-7455-437b-9657-e95629c799cd', 'role', 'system/role/index', 'C', 'Role', '角色管理', '1', NULL, '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:05:52.787406', '2026-04-22 18:07:10.000000', 'admin', 'admin', 'ea3ed9fc-1f59-4c97-8079-daf5fb65314f', 'b254fc65-60a6-4f74-8bf6-345c23000ba3', NULL, NULL, 'F', NULL, '用户新增', '1', 'system:user:create', '1', 2, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:16:42.979601', '2026-04-22 18:16:42.979601', 'admin', 'admin', 'f0b63715-59e7-4143-abcf-28c1adc8b0b1', '276cdb30-1167-4c71-85a6-86a5a75f1e8b', NULL, NULL, 'F', NULL, '在线用户查询', '1', 'monitor:online:query', '1', 1, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:10:13.397955', '2026-04-22 18:11:07.000000', 'admin', 'admin', 'f1a5d7b6-86e4-408a-a2f1-7e08a1472058', '3c904fde-7455-437b-9657-e95629c799cd', 'menu', 'system/menu/index', 'C', 'Menu', '菜单管理', '1', NULL, '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:18:56.124657', '2026-04-26 14:13:59.000000', 'admin', 'admin', 'f3444f24-e563-41a6-a97f-5424d505bdbb', 'd7dc7db2-bb66-484e-8f90-53d731ea5a57', 'cache', 'monitor/cache/index', 'C', 'Redis', '缓存监控', '1', NULL, '1', 4, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:21:56.814558', '2026-04-22 18:22:00.000000', 'admin', 'admin', 'f66ee797-1b85-412c-a1fb-f3aa90a0387b', '0', 'example', NULL, 'M', 'Resource', '效果案例', '1', NULL, '1', 3, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 02:26:13.942254', '2026-04-25 14:25:29.000000', 'admin', 'admin', 'fc2bc127-fac7-4511-9707-2d6fc51d68a5', '5ddd2884-3d0c-43a0-abfb-4b0efac62d30', NULL, NULL, 'F', NULL, '任务导出', '1', 'monitor:job:export', '1', 6, NULL, '0');
INSERT INTO `sys_menu` VALUES ('2026-04-25 02:24:38.611940', '2026-04-25 02:24:38.611940', 'admin', 'admin', 'fcc64755-3d18-4c8a-ae5d-4b95134e914f', '5ddd2884-3d0c-43a0-abfb-4b0efac62d30', NULL, NULL, 'F', NULL, '任务查询', '1', 'monitor:job:query', '1', 1, NULL, '0');

-- ----------------------------
-- Table structure for sys_oper_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_oper_log`;
CREATE TABLE `sys_oper_log`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '模块标题',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '操作人员',
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '方法名称',
  `request_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '请求方式',
  `params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '请求参数',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '请求接口',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '请求IP',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '请求地址',
  `businessType` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '操作类型',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '操作状态',
  `oper_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '请求时间',
  `duration` int(11) DEFAULT NULL COMMENT '请求耗时',
  `request_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '请求唯一标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_oper_log
-- ----------------------------
INSERT INTO `sys_oper_log` VALUES ('d3b91ee5-4c6e-49fe-85e3-a61ac53ea34b', '操作日志', 'admin', 'LogController.clearOperinfo', 'DELETE', '{\n  \"query\": {}\n}', '/api/monitor/log/operlog/clear', '127.0.0.1', '内网IP', '4', '1', '2026-04-28 11:15:01', 21, '3d984ec5-d5ef-43c5-9914-814c4a592c4f');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色编码',
  `role_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  `role_sort` int(11) NOT NULL DEFAULT 1 COMMENT '角色排序',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_fd8cc60f0258a8d5948141d98e`(`role_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('2026-04-20 21:10:07.256345', '2026-04-20 21:10:07.256345', 'admin', 'admin', '060999e4-ae01-47a8-a0a1-d32b96490e92', 'admin', '系统管理员', 1, '1', '最高权限');
INSERT INTO `sys_role` VALUES ('2026-04-22 14:01:22.815409', '2026-04-22 14:22:19.000000', 'admin', 'admin', 'a6967a5d-d645-48c5-a175-eaa5fb6ba25d', 'common', '普通角色', 2, '1', '普通角色');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE,
  INDEX `IDX_b65fa84413c357d7282153b4a8`(`role_id`) USING BTREE,
  INDEX `IDX_543ffcaa38d767909d9022f252`(`menu_id`) USING BTREE,
  CONSTRAINT `FK_543ffcaa38d767909d9022f2522` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_b65fa84413c357d7282153b4a88` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('a6967a5d-d645-48c5-a175-eaa5fb6ba25d', '2bd7fb00-d6ae-4444-9d69-dc833a3e725f');
INSERT INTO `sys_role_menu` VALUES ('a6967a5d-d645-48c5-a175-eaa5fb6ba25d', '83e4eecf-5ef2-461f-9943-8ff7e4600656');
INSERT INTO `sys_role_menu` VALUES ('a6967a5d-d645-48c5-a175-eaa5fb6ba25d', 'f66ee797-1b85-412c-a1fb-f3aa90a0387b');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `login_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '最后登录时间',
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '昵称',
  `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2' COMMENT '性别',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9e7164b2f1ea1348bc0eb0a7da`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('2026-04-19 02:39:01.392827', '2026-04-28 11:13:54.000000', 'admin', 'admin', '866b0232-507b-42a4-bdc1-47fc4a83616a', 'admin', '$argon2id$v=19$m=65536,t=3,p=4$inTpzf3epiqXwcjgXNNYww$dvIFM+MCgd1oFE5z2XS14KgNct4KrMrtgla+BwOtfwo', '18888888888', '188@163.com', '1', NULL, '2026-04-28 11:13:54', '祂', '2', '系统管理员');
INSERT INTO `sys_user` VALUES ('2026-04-20 03:44:22.291192', '2026-04-22 14:09:19.000000', 'admin', 'admin', 'f93176b9-6cc6-4e5a-addc-53257113c383', 'test', '$argon2id$v=19$m=65536,t=3,p=4$7pkc53QbbZg+JCpl+vryVQ$ah5MxOYhytw9jcaQHmGhWZ5TT8KXB+EJLlHDxxAD+ak', '19999999999', '19999999999@126.com', '1', 18, NULL, '测试', '1', '测试角色');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  INDEX `IDX_71b4edf9aedbd3e5707156e80a`(`user_id`) USING BTREE,
  INDEX `IDX_e8300bfcf561ed417f5f02c677`(`role_id`) USING BTREE,
  CONSTRAINT `FK_71b4edf9aedbd3e5707156e80a2` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_e8300bfcf561ed417f5f02c6776` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('866b0232-507b-42a4-bdc1-47fc4a83616a', '060999e4-ae01-47a8-a0a1-d32b96490e92');
INSERT INTO `sys_user_role` VALUES ('f93176b9-6cc6-4e5a-addc-53257113c383', 'a6967a5d-d645-48c5-a175-eaa5fb6ba25d');

SET FOREIGN_KEY_CHECKS = 1;
