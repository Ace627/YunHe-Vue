-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: yunhe
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sys_dict_data`
--

DROP TABLE IF EXISTS `sys_dict_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_dict_data` (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dict_label` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典标签',
  `dict_value` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典值',
  `dict_sort` int NOT NULL DEFAULT '1' COMMENT '排序',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `dict_type_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典类型',
  `list_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '表格回显样式',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict_data`
--

LOCK TABLES `sys_dict_data` WRITE;
/*!40000 ALTER TABLE `sys_dict_data` DISABLE KEYS */;
INSERT INTO `sys_dict_data` VALUES ('2026-04-26 02:05:25.582744','2026-04-26 02:05:25.582744','admin','admin','03650518-a9ca-470e-a568-1e4b16d1c486','默认分组','DEFAULT',1,'1','默认分组','b8849a88-e972-42fc-9b87-75f0c8d18157','sys_job_group',NULL),('2026-04-21 21:56:40.564404','2026-04-26 00:12:37.000000','admin','admin','059632a3-5c6c-4e2e-9cb0-8e305a4c3750','导出','6',6,'1','导出操作','da04de16-1667-47cf-916d-13716ed651a2','sys_oper_type','warning'),('2026-04-21 21:55:53.656981','2026-04-26 00:12:19.000000','admin','admin','091ac304-a43b-4564-8c60-a2a70f1bd52e','删除','3',3,'1','删除操作','da04de16-1667-47cf-916d-13716ed651a2','sys_oper_type','danger'),('2026-04-21 22:01:25.164522','2026-04-26 01:37:09.000000','admin','admin','0ab42d49-d246-496b-9f06-52d40dc46314','停用','0',2,'1','停用状态','8ab1bfca-3b61-4708-b7eb-202732db1ac1','sys_normal_disable','danger'),('2026-04-26 02:28:58.378019','2026-04-26 02:28:58.378019','admin','admin','27c0f923-3805-45a8-b7d0-833c9edef72a','隐藏','0',2,'1','菜单侧栏隐藏','2092c5ba-54ed-4d88-aadc-02bd8d65644f','sys_menu_visible','danger'),('2026-04-21 21:56:09.099594','2026-04-26 00:12:24.000000','admin','admin','330e9abf-5237-4a95-b3e7-7f7b4bf84844','清空','4',4,'1','清空操作','da04de16-1667-47cf-916d-13716ed651a2','sys_oper_type','danger'),('2026-04-20 04:48:02.938037','2026-04-26 01:57:24.000000','admin','admin','36644392-be54-4c54-a3d0-fe93ebf4d2d2','成功','1',1,'1','成功状态','4e72f93b-9051-4c0b-bbb6-7fd833c2555b','sys_common_status','primary'),('2026-04-21 21:56:24.075431','2026-04-26 00:12:30.000000','admin','admin','447796f1-27e6-4bea-8ebb-bc1e53a021f2','强退','5',5,'1','强退操作','da04de16-1667-47cf-916d-13716ed651a2','sys_oper_type','danger'),('2026-04-26 02:28:41.900461','2026-04-26 02:28:41.900461','admin','admin','9093966a-f3ac-42a0-b007-4e1e8e45b1a5','显示','1',1,'1','菜单侧栏显示','2092c5ba-54ed-4d88-aadc-02bd8d65644f','sys_menu_visible','primary'),('2026-04-26 02:04:31.785571','2026-04-26 02:04:31.785571','admin','admin','98f6b84f-bfe9-4e4f-9bdc-d618b1c61067','暂停','0',2,'1','暂停状态','6821fa61-5032-4d68-85a6-ddce61716386','sys_job_status','danger'),('2026-04-26 01:44:42.287330','2026-04-26 01:44:42.287330','admin','admin','a24a6b5c-9378-481b-9419-931f690cbc60','女','1',2,'1','性别女','1cf7d66a-1119-428f-b1cd-16d103b9a932','sys_user_gender',NULL),('2026-04-21 21:55:08.830102','2026-04-26 00:12:04.000000','admin','admin','a42483c1-6d59-43e6-8a77-35417d412fa7','新增','1',1,'1','新增操作','da04de16-1667-47cf-916d-13716ed651a2','sys_oper_type','info'),('2026-04-21 21:55:39.622294','2026-04-26 00:12:10.000000','admin','admin','a6f53fa4-90c3-4737-8dda-b9b9c72142bb','修改','2',2,'1','修改操作','da04de16-1667-47cf-916d-13716ed651a2','sys_oper_type','info'),('2026-04-26 01:44:19.128474','2026-04-26 01:44:19.128474','admin','admin','a8e265ea-98a0-4fc5-976d-6c1bf4d3a131','男','0',1,'1','	\n性别男','1cf7d66a-1119-428f-b1cd-16d103b9a932','sys_user_gender',NULL),('2026-04-20 04:48:16.924791','2026-04-26 01:57:27.000000','admin','admin','bca4e85d-5cd7-4f7f-b5c9-09d5cb869f65','失败','0',2,'1','失败状态','4e72f93b-9051-4c0b-bbb6-7fd833c2555b','sys_common_status','danger'),('2026-04-26 01:44:56.903460','2026-04-26 01:44:56.903460','admin','admin','d1f9b46c-10de-4dd3-b2c5-1862b6b5103a','未知','2',3,'1','性别未知','1cf7d66a-1119-428f-b1cd-16d103b9a932','sys_user_gender',NULL),('2026-04-21 22:01:10.880780','2026-04-26 01:37:12.000000','admin','admin','d30dcaea-b7f3-40fa-b825-b49437fee7d8','正常','1',1,'1','正常状态','8ab1bfca-3b61-4708-b7eb-202732db1ac1','sys_normal_disable','primary'),('2026-04-26 02:05:46.826895','2026-04-26 02:05:46.826895','admin','admin','d38206f0-cd99-4cea-a858-0d8d85427f43','系统分组','SYSTEM',2,'1','系统分组','b8849a88-e972-42fc-9b87-75f0c8d18157','sys_job_group',NULL),('2026-04-26 02:04:06.432354','2026-04-26 02:04:06.432354','admin','admin','e5827acf-7e8d-4d6b-a39a-707af2f44af2','正常','1',1,'1','正常状态','6821fa61-5032-4d68-85a6-ddce61716386','sys_job_status','primary'),('2026-04-21 21:54:49.555544','2026-04-26 00:12:43.000000','admin','admin','fd503e74-72cb-4218-9761-c5e58a18369b','其它','0',99,'1','其它操作','da04de16-1667-47cf-916d-13716ed651a2','sys_oper_type','info');
/*!40000 ALTER TABLE `sys_dict_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dict_type`
--

DROP TABLE IF EXISTS `sys_dict_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_dict_type` (
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
  UNIQUE KEY `IDX_f4e4273658733a3bbe6a2479bf` (`dict_type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict_type`
--

LOCK TABLES `sys_dict_type` WRITE;
/*!40000 ALTER TABLE `sys_dict_type` DISABLE KEYS */;
INSERT INTO `sys_dict_type` VALUES ('2026-04-26 01:43:16.497197','2026-04-26 01:43:16.497197','admin','admin','1cf7d66a-1119-428f-b1cd-16d103b9a932','用户性别','sys_user_gender','1','用户性别列表'),('2026-04-26 02:28:22.163277','2026-04-26 02:28:22.163277','admin','admin','2092c5ba-54ed-4d88-aadc-02bd8d65644f','菜单显隐','sys_menu_visible','1','菜单显隐列表'),('2026-04-20 04:34:50.882849','2026-04-20 17:17:19.000000','admin','admin','4e72f93b-9051-4c0b-bbb6-7fd833c2555b','系统状态','sys_common_status','1','系统状态列表'),('2026-04-26 02:03:42.902823','2026-04-26 02:03:42.902823','admin','admin','6821fa61-5032-4d68-85a6-ddce61716386','任务状态','sys_job_status','1','任务状态列表'),('2026-04-21 22:00:02.965176','2026-04-21 22:00:02.965176','admin','admin','8ab1bfca-3b61-4708-b7eb-202732db1ac1','系统开关','sys_normal_disable','1','系统开关列表'),('2026-04-26 02:04:54.226160','2026-04-26 02:04:54.226160','admin','admin','b8849a88-e972-42fc-9b87-75f0c8d18157','任务分组','sys_job_group','1','任务分组列表'),('2026-04-21 21:53:40.882517','2026-04-21 21:59:01.000000','admin','admin','da04de16-1667-47cf-916d-13716ed651a2','操作类型','sys_oper_type','1','操作类型列表');
/*!40000 ALTER TABLE `sys_dict_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_job`
--

DROP TABLE IF EXISTS `sys_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_job` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_job`
--

LOCK TABLES `sys_job` WRITE;
/*!40000 ALTER TABLE `sys_job` DISABLE KEYS */;
INSERT INTO `sys_job` VALUES ('2026-04-25 13:45:13.263668','2026-05-01 17:34:43.000000','admin','admin','df3c4304-4946-45d9-9376-c45ef333150d','测试','DEFAULT','JobService.test()','* * * * * *','0','1','0');
/*!40000 ALTER TABLE `sys_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_job_log`
--

DROP TABLE IF EXISTS `sys_job_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_job_log` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DEFAULT' COMMENT '任务组名',
  `invoke_target` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '调用目标字符串',
  `job_message` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '日志信息',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_job_log`
--

LOCK TABLES `sys_job_log` WRITE;
/*!40000 ALTER TABLE `sys_job_log` DISABLE KEYS */;
INSERT INTO `sys_job_log` VALUES ('08be2173-56d3-4d47-9c99-611e77549131','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:51'),('12ac4bba-678f-4625-a32b-2e73d2f10b37','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:23'),('1428ae75-5b9c-44c8-83d5-c9ef9588a730','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:15'),('14a71e8b-c2ec-4c78-9dbd-3427be928b44','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:42'),('1a03207d-3fab-4c30-8e14-f03ac75cc429','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:41'),('2132d515-518b-4c62-8bf8-6fce3b67e056','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:10'),('22623aa4-7c7c-4ab1-83b9-c81e98eda103','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:49'),('296a4efa-3af7-4bb5-99d3-9b9b54b66a7c','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:38'),('299dfdca-15d3-4ed2-b3d5-a55398afb9c7','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-01 07:30:14'),('2f91e5a4-e8c7-4025-8d0f-ec35f9749f64','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:29'),('38e8f957-e3f5-4b8f-b028-935025dd7189','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:54'),('3d94077f-23ef-40bf-a35a-ed0058fe3a3b','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:26'),('3f8281d9-a1ee-49fd-aaa4-b60785759f15','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:00'),('42804bbb-0d6b-4eee-9644-e37ab1d019ec','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:33'),('4295ebd3-961d-46c6-93ad-a166aa85c342','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:39'),('4c2ba714-682a-435a-ba42-a6b9f21fda19','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:09'),('4cc99e0c-4bcf-413a-a8ed-446d1d4800d8','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:52'),('5883d817-ef8a-4f32-aef8-47fdc1b1e0bc','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:57'),('617291ee-a448-4fe7-837a-9205dbc92065','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:53'),('70f26c77-4835-4261-b019-517e52192eff','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:34'),('716dd3d5-488f-4e86-97a9-dcbe4dce6623','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:18'),('76298f39-6ea9-46b3-b78a-1f497df3bb36','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:02'),('79bf97ec-4141-41e0-8ab2-e88ed8edc504','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:11'),('7b64f995-e014-48c5-add2-81340a4ff098','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:40'),('7c266480-abcf-4a68-a891-4f9303788c9a','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:06'),('7ec63be9-70c3-4e66-8256-6b153149baf1','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:55'),('88286dfc-6530-45f9-8116-d887fcdf3589','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:30'),('8b405e89-8bb6-4941-9d9c-45887e9eb60f','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:20'),('8b489d6c-fddf-4e18-af51-2c6e4dfaa1f0','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:56'),('9716fb36-309f-4ab2-89ef-649d3c0cc9ba','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:12'),('9c943835-9cd5-4f92-a4f6-9bf83d04d4f1','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:37'),('9e36853d-da9c-4a37-91b0-d8c4be2fc77e','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:03'),('ac0c9c7d-39de-46a2-b49d-0561c91725bd','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:21'),('ada96cb0-8dce-4b72-a50c-2bd4130817cc','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:50'),('b00d7359-23ff-4901-be03-9d3a1ac57530','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:05'),('b0eeeb9c-1245-40e5-a3ee-e510724e4f77','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:27'),('b9081880-a695-4c27-9cee-9900c8db0a74','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:01'),('b92c2772-1aab-4fd4-bf8a-6b47d84479a7','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:59'),('b9abb099-6e87-443f-a30d-bd23bc39a87f','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:24'),('c7479fd9-8b22-474a-b1aa-a6b55c806656','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-01 06:15:32'),('cc4755e3-5e9a-40cf-9589-3511c9ff87b5','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:32'),('cf4d0ce5-2fcd-4f55-9af0-a20915ea7de6','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:07'),('d0d622fb-85e9-4adc-a589-d4bf5c979060','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:17'),('d10d2836-22ee-45ab-8a25-3a8418a575fb','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-01 06:15:57'),('d4259db4-f4ad-47ee-bbb6-222ee069968e','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:14'),('d506c442-9377-498c-aeb2-cf4e6a081686','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:43'),('d857ddc9-7c22-4bda-8232-b39b6f9e842e','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:19'),('dbe072a7-9a16-4a73-958a-e85c4ebd1ba7','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:22'),('dc8b8b38-003f-448f-b67c-085aadd770c4','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:16'),('dd90de2a-e54d-49d3-ae7e-4edbd4a08dfa','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:35'),('ea83d00d-c71b-4124-be04-f4b48987658b','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:13'),('eb79ae9b-4135-4fb1-80bc-3a99083199ae','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:33:58'),('ee0976ae-5d02-4684-9589-30334cef1c9e','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:28'),('ef35f91d-5843-4b3c-b0f5-c1d6defa6096','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:04'),('f2f17a5a-e883-48e6-8ba3-c96648bf5f0c','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:08'),('f74f6386-28f9-4f7e-a376-9f2367683eb9','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:31'),('fcb3ed88-5bfa-468f-87de-1d5653ad1f8a','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:25'),('fd7a3ed7-6cf0-4dab-83e7-5f60e5c0b6c8','测试','DEFAULT','JobService.test()','执行成功','1','2026-05-02 01:34:36');
/*!40000 ALTER TABLE `sys_job_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_login_log`
--

DROP TABLE IF EXISTS `sys_login_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_login_log` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_login_log`
--

LOCK TABLES `sys_login_log` WRITE;
/*!40000 ALTER TABLE `sys_login_log` DISABLE KEYS */;
INSERT INTO `sys_login_log` VALUES ('15855a17-c7f7-4581-beb4-d04dfba5e308','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-04-30 23:50:36','0264cac6-cec0-4b3b-88ac-f163a75fbfe4'),('19ed3bde-7ff7-4e72-81a2-a7f2f8ff114a','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 00:19:25','948b07f3-f251-4f09-919c-e3678b28fca4'),('2d2ffbaa-2ba8-415d-a5ec-14c1a5f701ff','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-02 00:00:41','60d7ddab-2e28-41de-9563-9ad14a5c04cb'),('32dae096-8b0d-4351-8635-6da2c3fce3bf','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 16:01:56','6adb75a4-78d8-41a1-a172-22edaff39f46'),('38f94c31-8861-4990-9d82-aee6b5d1697b','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 02:35:16','551c05bf-f6ab-4ea2-9273-5502689a6786'),('4c3c2e32-ae29-4760-9522-4c45c44223a6','admin','172.20.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 06:05:53','65422d25-5280-4989-8658-b543ac1a5c7c'),('4e723333-5f7f-4467-ba47-78ac44b61649','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 23:20:15','a892e767-9265-4125-a17f-412fb3f98144'),('5b33d318-8707-4703-b09d-0bc617763699','admin','172.20.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-04-29 14:14:24','6f709431-03b9-4ade-bcdd-e6061dafbc41'),('5e4f1e2a-1073-4bf2-80c8-2c7478b7a8c9','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 20:04:48','85598537-6e9f-4206-aed7-805fa42e49c1'),('6016b0a3-bcd6-400f-b0da-568b6c668bb3','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 06:11:26','e176ce91-4fe5-4759-bf86-f29cf847863c'),('650b0d99-5a3a-44a4-af6e-607b58e36efe','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-02 01:00:35','d77021eb-6678-40e8-9213-c22733af5151'),('67c7816f-0392-46c6-97be-b56af437fd49','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 23:59:15','16afeb8e-6228-40ad-9fdd-bfdf2573b0c1'),('7cabc752-f345-43f2-9e78-a2b9c9203ae8','admin','172.20.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-04-29 10:12:30','130797cc-9bf4-4b2a-a466-4ccda3714cb8'),('880cea5e-7e29-4d1f-be8d-fe4d71d3a4d0','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 07:22:01','85f0f0ae-8075-454e-b844-9d7c762f2668'),('8ba76054-7c94-4a9e-92cf-65198fc74975','admin','172.20.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-04-30 01:50:51','7c7de141-9615-48d0-b72d-aa17d5af5bf2'),('9786b9ad-4707-4ddf-988e-ddb23e5a11d7','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 23:19:07','1b3d5cff-0465-4a0f-89f9-0344b5e239e3'),('a5d9ca58-2cf2-466d-90c6-5df66f813402','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','0','验证码已过期，请刷新后重试','2026-05-01 21:46:17','b094b7a7-50c5-4336-a378-b85e70c93aba'),('b40e6a64-75cc-4e74-b64d-bfd99f3605ab','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 20:00:27','a27dd5ba-225f-4ca7-ab7c-087ae74f60dc'),('b4f5712a-0d7b-49c1-a8b7-55dd5faf1e34','admin','172.20.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-04-29 10:27:50','17e431dc-87e2-46c5-82f9-99270bcf7290'),('c393e055-a76a-4869-9f66-cd87d4a1fc4f','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 21:46:19','f48fdcfc-2d9b-4ff1-9efb-15e5ad225349'),('c694eafa-6d7f-40f8-915f-02cd1d9c0563','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-02 01:00:54','6fe88507-6276-4768-8ccb-886f15cded71'),('c6d2f3c9-cef3-4f38-a40c-7dced75c7e63','admin','127.0.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-05-01 05:05:15','6f2458e1-189a-436c-b303-26db5c0bc09b'),('e2ba8402-787d-4a30-9cf9-5525198aecf5','admin','172.20.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-04-29 10:23:20','c2bddd69-81c0-4fe2-99dd-7b2ceb56d2cd'),('ec384e1b-bb22-4cf3-bbe2-e69e2e7f8782','admin','172.20.0.1','内网IP','Chrome134.0.0.0','Windows10','1','登录成功','2026-04-29 11:12:15','1dd4398b-808d-4e24-b7f7-ce9e0379ca40');
/*!40000 ALTER TABLE `sys_login_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menu`
--

DROP TABLE IF EXISTS `sys_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_menu` (
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
  `menu_sort` int NOT NULL DEFAULT '1' COMMENT '显示顺序',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `is_cache` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '是否缓存组件',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES ('2026-04-22 18:11:39.612401','2026-04-22 18:11:39.612401','admin','admin','07848a5b-661b-421b-802d-2263f507a0a1','f1a5d7b6-86e4-408a-a2f1-7e08a1472058',NULL,NULL,'F',NULL,'菜单新增','1','system:menu:create','1',2,NULL,'0'),('2026-04-22 18:11:56.772858','2026-04-22 18:11:56.772858','admin','admin','09bcd942-a1ed-49b5-9975-a8c781087398','f1a5d7b6-86e4-408a-a2f1-7e08a1472058',NULL,NULL,'F',NULL,'菜单删除','1','system:menu:delete','1',4,NULL,'0'),('2026-04-22 18:13:25.097826','2026-04-22 18:13:25.097826','admin','admin','11a5501d-8f7e-4ccb-87bc-aaf0c3fe37ba','724fe5d0-d104-4d35-b1bc-ff5bfb4ca066',NULL,NULL,'F',NULL,'字典删除','1','system:dict:delete','1',4,NULL,'0'),('2026-04-25 13:00:24.642759','2026-04-25 13:00:24.642759','admin','admin','14575a54-7305-4de8-a68d-f982ed351e87','2db234ff-ad75-4b4f-8d46-b3ea13b506b0',NULL,NULL,'F',NULL,'登录日志删除','1','monitor:logininfor:delete','1',2,NULL,'0'),('2026-04-25 02:25:14.800525','2026-04-25 02:25:14.800525','admin','admin','184bd2a2-5396-4cc2-b099-fda1e1f3784d','5ddd2884-3d0c-43a0-abfb-4b0efac62d30',NULL,NULL,'F',NULL,'任务编辑','1','monitor:job:update','1',3,NULL,'0'),('2026-04-25 13:01:24.267847','2026-04-25 13:01:24.267847','admin','admin','263b753d-6bbc-4a51-bee2-cd9795792300','4c4f25fd-3037-4aee-ae9b-91edccdf7792',NULL,NULL,'F',NULL,'操作日志删除','1','monitor:operlog:delete','1',2,NULL,'0'),('2026-04-22 18:15:56.146227','2026-04-22 18:15:56.146227','admin','admin','276cdb30-1167-4c71-85a6-86a5a75f1e8b','d7dc7db2-bb66-484e-8f90-53d731ea5a57','online','monitor/online/index','C','Online','在线用户','1',NULL,'1',1,NULL,'0'),('2026-04-22 18:23:27.351383','2026-04-22 18:23:27.351383','admin','admin','2bd7fb00-d6ae-4444-9d69-dc833a3e725f','f66ee797-1b85-412c-a1fb-f3aa90a0387b','lazyimg','example/ImageLazyLoad','C','Image','图片懒加载','1',NULL,'1',2,NULL,'0'),('2026-04-22 18:06:11.091525','2026-04-22 18:07:15.000000','admin','admin','2d407543-5a92-4f82-b836-2643317dd918','b254fc65-60a6-4f74-8bf6-345c23000ba3',NULL,NULL,'F',NULL,'用户编辑','1','system:user:update','1',3,NULL,'0'),('2026-04-22 18:20:36.798732','2026-04-24 18:00:53.000000','admin','admin','2db234ff-ad75-4b4f-8d46-b3ea13b506b0','3c904fde-7455-437b-9657-e95629c799cd','logininfor','monitor/logininfor/index','C','Logininfor','登录日志','1',NULL,'1',5,NULL,'0'),('2026-04-22 17:50:24.299654','2026-04-22 17:50:24.299654','admin','admin','3c904fde-7455-437b-9657-e95629c799cd','0','system',NULL,'M','Setting','系统管理','1',NULL,'1',1,NULL,'0'),('2026-04-25 13:01:37.117659','2026-04-25 13:01:37.117659','admin','admin','415a6369-6643-4f95-98da-671348ea148b','4c4f25fd-3037-4aee-ae9b-91edccdf7792',NULL,NULL,'F',NULL,'操作日志清空','1','monitor:operlog:clear','1',3,NULL,'0'),('2026-04-22 18:09:17.387307','2026-04-22 18:09:17.387307','admin','admin','42ce5cc6-4d3c-41fe-b48f-20bac793b0d6','e7b367dd-61ab-465d-8c6f-bf8819bbdde3',NULL,NULL,'F',NULL,'角色查询','1','system:role:query','1',1,NULL,'0'),('2026-04-25 02:25:29.395759','2026-04-25 02:25:29.395759','admin','admin','4bd126da-978a-4198-a1c0-cdc2e7051b7d','5ddd2884-3d0c-43a0-abfb-4b0efac62d30',NULL,NULL,'F',NULL,'任务删除','1','monitor:job:delete','1',4,NULL,'0'),('2026-04-22 18:21:06.817798','2026-04-24 18:00:57.000000','admin','admin','4c4f25fd-3037-4aee-ae9b-91edccdf7792','3c904fde-7455-437b-9657-e95629c799cd','operlog','monitor/operlog/index','C','Log','操作日志','1',NULL,'1',6,NULL,'0'),('2026-04-25 13:01:51.174051','2026-04-25 13:01:51.174051','admin','admin','4c580309-c10e-42af-835b-18f0056bc06d','4c4f25fd-3037-4aee-ae9b-91edccdf7792',NULL,NULL,'F',NULL,'操作日志导出','1','monitor:operlog:export','1',4,NULL,'0'),('2026-04-25 13:00:55.153717','2026-04-25 13:00:55.153717','admin','admin','54084b09-7f45-4c6b-b01b-0a40ef350dee','2db234ff-ad75-4b4f-8d46-b3ea13b506b0',NULL,NULL,'F',NULL,'登录日志导出','1','monitor:logininfor:export','1',4,NULL,'0'),('2026-04-25 13:01:09.452401','2026-04-25 13:01:09.452401','admin','admin','5cf5bfbb-a5d2-4fb9-8c71-47c2d01936bb','4c4f25fd-3037-4aee-ae9b-91edccdf7792',NULL,NULL,'F',NULL,'操作日志查询','1','monitor:operlog:query','1',1,NULL,'0'),('2026-04-24 23:52:29.060269','2026-04-24 23:53:05.000000','admin','admin','5ddd2884-3d0c-43a0-abfb-4b0efac62d30','d7dc7db2-bb66-484e-8f90-53d731ea5a57','job','monitor/job/index','C','Schedule','定时任务','1',NULL,'1',2,NULL,'0'),('2026-04-25 02:25:04.285759','2026-04-25 02:25:04.285759','admin','admin','605e8a35-795d-45b7-94b1-cde26608224d','5ddd2884-3d0c-43a0-abfb-4b0efac62d30',NULL,NULL,'F',NULL,'任务新增','1','monitor:job:create','1',2,NULL,'0'),('2026-04-22 18:19:39.235367','2026-04-24 23:51:23.000000','admin','admin','645995d5-ba47-4b2e-9c96-23d018e46ba3','d7dc7db2-bb66-484e-8f90-53d731ea5a57','cache/list','monitor/cache/list','C','CacheList','缓存列表','1',NULL,'1',5,NULL,'0'),('2026-04-22 18:12:33.508671','2026-04-22 18:12:33.508671','admin','admin','724fe5d0-d104-4d35-b1bc-ff5bfb4ca066','3c904fde-7455-437b-9657-e95629c799cd','dict','system/dict/index','C','Dict','字典管理','1',NULL,'1',4,NULL,'0'),('2026-04-22 18:07:44.243174','2026-04-22 18:07:44.243174','admin','admin','75314fe5-9de0-4d06-a64e-e1a2acda4cab','b254fc65-60a6-4f74-8bf6-345c23000ba3',NULL,NULL,'F',NULL,'用户删除','1','system:user:delete','1',4,NULL,'0'),('2026-04-22 18:09:25.637405','2026-04-22 18:09:25.637405','admin','admin','7600becb-6fc6-4867-860b-8132b47c0082','e7b367dd-61ab-465d-8c6f-bf8819bbdde3',NULL,NULL,'F',NULL,'角色新增','1','system:role:create','1',2,NULL,'0'),('2026-04-22 18:13:01.990107','2026-04-22 18:13:01.990107','admin','admin','7ade8b4f-dc87-4406-826f-be66a253f971','724fe5d0-d104-4d35-b1bc-ff5bfb4ca066',NULL,NULL,'F',NULL,'字典新增','1','system:dict:create','1',2,NULL,'0'),('2026-04-22 18:22:41.393424','2026-04-22 18:22:41.393424','admin','admin','83e4eecf-5ef2-461f-9943-8ff7e4600656','f66ee797-1b85-412c-a1fb-f3aa90a0387b','taichi','example/TaiChi','C','TaiChi','旋转太极图','1',NULL,'1',1,NULL,'0'),('2026-04-22 18:18:15.132872','2026-04-24 23:51:05.000000','admin','admin','868a41a9-4b98-4c61-bdfa-830000dec5d9','d7dc7db2-bb66-484e-8f90-53d731ea5a57','server','monitor/server/index','C','Server','服务监控','1',NULL,'1',3,NULL,'0'),('2026-04-22 18:12:48.838774','2026-04-22 18:12:48.838774','admin','admin','8eada0a9-ddbe-4c07-974c-e8e90f60effe','724fe5d0-d104-4d35-b1bc-ff5bfb4ca066',NULL,NULL,'F',NULL,'字典查询','1','system:dict:query','1',1,NULL,'0'),('2026-04-22 18:13:10.199338','2026-04-22 18:13:10.199338','admin','admin','9c13033c-860e-4b1a-b7c8-775286c2c531','724fe5d0-d104-4d35-b1bc-ff5bfb4ca066',NULL,NULL,'F',NULL,'字典编辑','1','system:dict:update','1',3,NULL,'0'),('2026-04-22 18:09:33.638196','2026-04-22 18:09:33.638196','admin','admin','a008effd-4b39-415b-a89a-6cbb2602280f','e7b367dd-61ab-465d-8c6f-bf8819bbdde3',NULL,NULL,'F',NULL,'角色编辑','1','system:role:update','1',3,NULL,'0'),('2026-04-22 18:09:43.449505','2026-04-22 18:09:43.449505','admin','admin','aaa92de8-0e3f-40ce-b18b-932b42e83241','e7b367dd-61ab-465d-8c6f-bf8819bbdde3',NULL,NULL,'F',NULL,'角色删除','1','system:role:delete','1',4,NULL,'0'),('2026-04-25 13:00:03.866942','2026-04-25 13:00:03.866942','admin','admin','adb1be50-5017-4c30-a536-fc0d5b53904a','2db234ff-ad75-4b4f-8d46-b3ea13b506b0',NULL,NULL,'F',NULL,'登录日志查询','1','monitor:logininfor:query','1',1,NULL,'0'),('2026-04-28 02:05:37.322124','2026-04-28 02:05:37.322124','admin','admin','aee9d7f9-728b-47c1-bec5-7a53b7e5dfcc','d7dc7db2-bb66-484e-8f90-53d731ea5a57','health','monitor/health/index','C','Tool','系统健康','1',NULL,'1',6,NULL,'0'),('2026-04-22 17:51:05.224632','2026-04-22 17:58:28.000000','admin','admin','b254fc65-60a6-4f74-8bf6-345c23000ba3','3c904fde-7455-437b-9657-e95629c799cd','user','system/user/index','C','User','用户管理','1',NULL,'1',1,NULL,'0'),('2026-04-22 18:17:09.081560','2026-04-22 18:17:09.081560','admin','admin','ba46fe67-c503-4edc-a598-e757a4205027','276cdb30-1167-4c71-85a6-86a5a75f1e8b',NULL,NULL,'F',NULL,'在线用户强退','1','monitor:online:forceLogout','1',2,NULL,'0'),('2026-04-25 13:00:37.717744','2026-04-25 13:00:37.717744','admin','admin','bad67e55-576c-452b-85af-16ddf43328d0','2db234ff-ad75-4b4f-8d46-b3ea13b506b0',NULL,NULL,'F',NULL,'登录日志清空','1','monitor:logininfor:clear','1',3,NULL,'0'),('2026-04-22 18:11:26.893843','2026-04-22 18:11:26.893843','admin','admin','bafe0cf3-0ef3-4cb6-9042-0d7e7eef72bc','f1a5d7b6-86e4-408a-a2f1-7e08a1472058',NULL,NULL,'F',NULL,'菜单查询','1','system:menu:query','1',1,NULL,'0'),('2026-04-23 14:57:48.255496','2026-04-23 15:31:36.000000','admin','admin','bbe5d132-8bf0-4d9f-ba20-d739f638a449','f66ee797-1b85-412c-a1fb-f3aa90a0387b','markdown','example/Markdown','C','Markdown','Markdown','1',NULL,'1',3,NULL,'0'),('2026-04-22 18:11:47.477813','2026-04-22 18:11:47.477813','admin','admin','c0bb9842-2a96-471c-933a-139f7cbfa5ad','f1a5d7b6-86e4-408a-a2f1-7e08a1472058',NULL,NULL,'F',NULL,'菜单编辑','1','system:menu:update','1',3,NULL,'0'),('2026-04-22 18:04:52.645251','2026-04-22 18:04:52.645251','admin','admin','c83c49c9-b1ef-4c55-8cc0-fe25efbf8e41','b254fc65-60a6-4f74-8bf6-345c23000ba3',NULL,NULL,'F',NULL,'用户查询','1','system:user:query','1',1,NULL,'0'),('2026-04-22 18:14:16.022700','2026-04-24 18:01:13.000000','admin','admin','ca76a64f-e632-42a9-aada-74a51524c31e','3c904fde-7455-437b-9657-e95629c799cd','icon','system/icon/index','C','Earth','图标管理','1',NULL,'1',9,NULL,'0'),('2026-04-22 18:15:12.441275','2026-04-22 18:15:12.441275','admin','admin','d7dc7db2-bb66-484e-8f90-53d731ea5a57','0','monitor',NULL,'M','Monitor','系统监控','1',NULL,'1',2,NULL,'0'),('2026-04-25 14:26:09.108444','2026-04-25 14:26:09.108444','admin','admin','d94e39b2-a6b8-4df8-a39c-dd7bd2ae33a2','5ddd2884-3d0c-43a0-abfb-4b0efac62d30',NULL,NULL,'F',NULL,'任务清空','1','monitor:job:clear','1',5,NULL,'0'),('2026-04-22 18:08:50.276077','2026-04-22 18:08:50.276077','admin','admin','e7b367dd-61ab-465d-8c6f-bf8819bbdde3','3c904fde-7455-437b-9657-e95629c799cd','role','system/role/index','C','Role','角色管理','1',NULL,'1',2,NULL,'0'),('2026-04-22 18:05:52.787406','2026-04-22 18:07:10.000000','admin','admin','ea3ed9fc-1f59-4c97-8079-daf5fb65314f','b254fc65-60a6-4f74-8bf6-345c23000ba3',NULL,NULL,'F',NULL,'用户新增','1','system:user:create','1',2,NULL,'0'),('2026-04-22 18:16:42.979601','2026-04-22 18:16:42.979601','admin','admin','f0b63715-59e7-4143-abcf-28c1adc8b0b1','276cdb30-1167-4c71-85a6-86a5a75f1e8b',NULL,NULL,'F',NULL,'在线用户查询','1','monitor:online:query','1',1,NULL,'0'),('2026-04-22 18:10:13.397955','2026-04-22 18:11:07.000000','admin','admin','f1a5d7b6-86e4-408a-a2f1-7e08a1472058','3c904fde-7455-437b-9657-e95629c799cd','menu','system/menu/index','C','Menu','菜单管理','1',NULL,'1',3,NULL,'0'),('2026-04-22 18:18:56.124657','2026-04-26 14:13:59.000000','admin','admin','f3444f24-e563-41a6-a97f-5424d505bdbb','d7dc7db2-bb66-484e-8f90-53d731ea5a57','cache','monitor/cache/index','C','Redis','缓存监控','1',NULL,'1',4,NULL,'0'),('2026-04-22 18:21:56.814558','2026-04-22 18:22:00.000000','admin','admin','f66ee797-1b85-412c-a1fb-f3aa90a0387b','0','example',NULL,'M','Resource','效果案例','1',NULL,'1',3,NULL,'0'),('2026-04-25 02:26:13.942254','2026-04-25 14:25:29.000000','admin','admin','fc2bc127-fac7-4511-9707-2d6fc51d68a5','5ddd2884-3d0c-43a0-abfb-4b0efac62d30',NULL,NULL,'F',NULL,'任务导出','1','monitor:job:export','1',6,NULL,'0'),('2026-04-25 02:24:38.611940','2026-04-25 02:24:38.611940','admin','admin','fcc64755-3d18-4c8a-ae5d-4b95134e914f','5ddd2884-3d0c-43a0-abfb-4b0efac62d30',NULL,NULL,'F',NULL,'任务查询','1','monitor:job:query','1',1,NULL,'0');
/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_oper_log`
--

DROP TABLE IF EXISTS `sys_oper_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_oper_log` (
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
  `duration` int DEFAULT NULL COMMENT '请求耗时',
  `request_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '请求唯一标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_oper_log`
--

LOCK TABLES `sys_oper_log` WRITE;
/*!40000 ALTER TABLE `sys_oper_log` DISABLE KEYS */;
INSERT INTO `sys_oper_log` VALUES ('0747bf95-5522-4bf4-b8ce-9df1e5eb268c','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"1\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:17:44',32,'ecda7739-e778-4577-8bb3-8de604697a69'),('09571074-af19-4ca1-9654-2fe661187720','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"1\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:19:53',36,'e3bfc22a-accb-45fb-90e8-160210eb9dc8'),('09e15b79-2dee-40e6-9bdd-0c080fb4df27','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 06:15:57',14,'9db30415-859a-4edc-9fd4-be20063cfa67'),('12a1dd9b-19e0-4cd1-bd2d-257e6787d846','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 03:30:52',5,'a6d3b09a-c600-4d97-9f50-65e4ea1353f9'),('12fb98af-64f0-4eda-b33a-7eee7b197bbf','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:53:35',9,'a4d095f3-05ea-4e8d-b1ab-76b5765289b8'),('13ed979a-b316-4a63-8cce-724cba1d66ea','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 03:06:56',13,'a9293450-6078-4fca-b910-06dbb33fbc13'),('158cedfd-6c63-43ad-9848-1b8f2776e502','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 03:06:07',10,'23f0b3fb-b346-4e47-99da-6a6cbf9b4b88'),('1aa71d55-f98d-4199-b137-0b9934be5aa0','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 03:04:44',24,'3bbd66c6-f350-49ca-bd70-9fc516aac267'),('1c64cd12-7a8a-4f2a-91cf-fee17ef11555','定时任务日志','admin','JobController.exportJobLog','POST','{\n  \"query\": {},\n  \"body\": {}\n}','/api/monitor/job/log/export','127.0.0.1','内网IP','6','1','2026-05-02 01:34:49',25,'239da124-5677-450a-8912-3a1b5c27e086'),('2bdbf0b7-2a22-4c74-b75f-df7689c856e5','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"1\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:14:00',49,'c38ca5d9-82f3-4ba1-8863-a0dbcd918cd6'),('2dcfb683-9b11-48a9-ab15-1ad82a222360','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"1\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:19:01',37,'508624b4-7bc1-4a20-9e50-e828da4a1a78'),('31757984-2b75-48c2-8b65-def44e62e3be','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:35:51',5,'6a9e4cb1-0a88-47a0-8515-53289c7f17e4'),('31981718-699c-44d3-8540-ee6c5a3af2ef','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"0\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:20:01',23,'57eca603-9117-4c71-ab0a-48d578af7db4'),('3358932d-3a85-456b-8734-6f73165465bd','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"0\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:17:53',14,'5471a0bb-d6fa-48be-8bd7-95d436728d40'),('3f6ce3bf-2944-438a-86c9-1b7f3b21c1c2','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','172.20.0.1','内网IP','2','1','2026-04-29 11:12:30',21,'c388e395-4595-4502-9140-f103dea58047'),('49c2a85b-43dd-46be-9962-4597c7c14ddc','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:56:45',19,'d8a44521-13a0-442e-8d17-02d822419fc6'),('5c95d8c9-3317-4ca2-ae49-43e8a98c2a8c','定时任务日志','admin','JobController.clearJobLog','DELETE','{\n  \"query\": {}\n}','/api/monitor/job/log/clear','127.0.0.1','内网IP','4','1','2026-05-01 03:13:56',23,'690608be-489e-4bc7-b39b-cc1725edb810'),('5e20a81a-a8c4-4208-aa27-7e64f3d483d6','定时任务日志','admin','JobController.exportJobLog','POST','{\n  \"query\": {},\n  \"body\": {}\n}','/api/monitor/job/log/export','127.0.0.1','内网IP','6','1','2026-05-02 01:33:41',41,'cc8b47de-a832-4d07-ad8c-6904adacea1e'),('5fc028ef-277c-4e3f-966b-abae2132e01d','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:53:53',3,'8f6161cf-2298-493a-a054-48449e8a7e42'),('62260339-cedf-4616-bcac-453f7d261205','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"0\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:30:45',16,'2d6cc5ca-b812-4e98-8305-92b05cb6f713'),('70fea202-beeb-464b-bc7f-33d13b97db0f','定时任务日志','admin','JobController.clearJobLog','DELETE','{\n  \"query\": {}\n}','/api/monitor/job/log/clear','127.0.0.1','内网IP','4','1','2026-05-01 02:53:49',22,'005ab6be-d94a-4706-8b7b-39d6f0b0e64e'),('757a17d2-44d7-4e62-ac24-9f96183e09ae','定时任务日志','admin','JobController.exportJobLog','POST','{\n  \"query\": {},\n  \"body\": {}\n}','/api/monitor/job/log/export','127.0.0.1','内网IP','6','1','2026-05-02 01:32:01',15,'4b540fc7-1ebf-4410-a273-a256bcf452aa'),('7a2fe5c7-4372-490f-bd6d-f533afd9e820','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:50:42',11,'a351da59-8a70-47e7-bdeb-090ee2815613'),('7b4a45cb-e95f-4705-8f3c-14f79cecf425','登录日志','admin','LogController.exportLogininfo','POST','{\n  \"query\": {},\n  \"body\": {}\n}','/api/monitor/log/logininfor/export','127.0.0.1','内网IP','6','1','2026-05-01 06:07:54',48,'c23f6c57-faa5-426e-9442-1c3ec26b1c36'),('7f90a665-8ce0-4a75-8b61-5a33eefd2680','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"0\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:07:55',13,'6c27cf2c-1f73-433a-9d16-7338f453253b'),('833f3222-d63a-46ec-9a75-bcca69c778f6','定时任务日志','admin','JobController.exportJobLog','POST','{\n  \"query\": {},\n  \"body\": {}\n}','/api/monitor/job/log/export','127.0.0.1','内网IP','6','1','2026-05-02 01:32:36',39,'623c18f4-f48a-42d5-9483-544a5221fbee'),('83d907f6-fe88-43a5-891b-3dd220da200c','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"1\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-02 01:33:48',38,'43fa34cd-bc74-4f53-9dae-2224b059a21e'),('87d8d398-4331-4cce-a213-c7884743adfc','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"1\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:27:14',26,'e7b54952-4941-481a-ac94-ac68896e2f8f'),('959b022e-9acd-46c3-9944-23d63bcddf0c','登录日志','admin','LogController.deleteLogininfo','DELETE','{\n  \"query\": {\n    \"ids\": \"776de79a-484f-4d85-a06d-55466cf3c632\"\n  }\n}','/api/monitor/log/logininfor/delete','127.0.0.1','内网IP','3','1','2026-05-01 20:04:59',15,'c9dffd19-a02c-446a-8a01-0e41e82dcdcf'),('95e2e849-d443-42d3-97ea-d1b127ec6024','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"0\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-02 01:34:43',11,'952dfcbd-1987-42de-8679-1a9b7f702ace'),('97202b13-fce0-4012-969d-98c7ee3af087','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"1\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:07:40',42,'6f05b35b-a655-41b3-be26-62fa9c89c398'),('a2ce9291-2721-4460-9cfc-36d1e5386195','定时任务日志','admin','JobController.clearJobLog','DELETE','{\n  \"query\": {}\n}','/api/monitor/job/log/clear','127.0.0.1','内网IP','4','1','2026-05-01 03:18:55',11,'8c645c84-05c2-4571-9b6d-00435ab6949b'),('a77c132d-b1de-4776-b5b3-0927c1d82d85','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:43:52',6,'44f0777f-81b1-4dd1-b59e-7a779cb7b220'),('ba41adf3-a948-4fcf-a099-6c6434fef7a0','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 03:30:48',10,'9a623715-50ec-41f4-a480-07ac227c8f4a'),('c02ccbfb-cb72-4e15-8cfe-1df0f5eb1a2f','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:49:12',9,'7e238f8a-ef22-400b-983b-eebd8a023697'),('cdf505c7-d6e6-48f9-952a-00825d23db0e','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 07:30:14',12,'bdabbdfe-ab78-4005-933d-3ac3f367a412'),('cfb1c58f-87e6-4e8a-aecb-b6a7ebcd6b9b','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:43:14',10,'a56bc1ae-1b4c-468b-8cc8-0fd85ae58609'),('d0230c03-8559-4b78-9636-fcf75980bb07','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"0\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:19:09',13,'3d487be6-abcf-4491-a6f2-07cb7dfa0257'),('d3b91ee5-4c6e-49fe-85e3-a61ac53ea34b','操作日志','admin','LogController.clearOperinfo','DELETE','{\n  \"query\": {}\n}','/api/monitor/log/operlog/clear','127.0.0.1','内网IP','4','1','2026-04-28 11:15:01',21,'3d984ec5-d5ef-43c5-9914-814c4a592c4f'),('dc676d01-d462-4bcb-a3ea-71bba44897fd','定时任务','admin','JobController.changeJobStatus','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"id\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"status\": \"0\"\n  }\n}','/api/monitor/job/changeStatus','127.0.0.1','内网IP','2','1','2026-05-01 03:14:10',11,'35347e26-5787-488c-853b-83686def2e3a'),('df767dd2-7dd9-482b-a3a1-9b03f1158367','定时任务日志','admin','JobController.exportJobLog','POST','{\n  \"query\": {},\n  \"body\": {}\n}','/api/monitor/job/log/export','127.0.0.1','内网IP','6','1','2026-05-02 01:31:55',48,'05637b5c-6188-445c-90c8-00cf50799501'),('e7e9afab-7281-4050-8331-1692e31d8060','定时任务日志','admin','JobController.clearJobLog','DELETE','{\n  \"query\": {}\n}','/api/monitor/job/log/clear','127.0.0.1','内网IP','4','1','2026-05-01 03:30:58',9,'a05804b8-dc69-43ca-ad92-ad759c81b9d0'),('ecea12e1-3c13-4b67-9876-ca22b667e997','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:58:26',9,'81953868-83f3-4396-9d55-07764cab84a5'),('f1f45b07-17c0-4fca-9d3b-02bc6d54202a','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:48:20',6,'c3ad8ace-5aac-49e9-b734-ad81f7275254'),('f901e677-a148-445e-bd7c-758b47e039d6','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 02:53:40',5,'6a83a936-a162-4a77-9b66-ba1f9c8c9af2'),('fa0a8380-212c-4ad4-a90b-085b5211efcc','定时任务','admin','JobController.runJob','PUT','{\n  \"query\": {},\n  \"body\": {\n    \"jobId\": \"df3c4304-4946-45d9-9376-c45ef333150d\",\n    \"jobGroup\": \"DEFAULT\"\n  }\n}','/api/monitor/job/run','127.0.0.1','内网IP','2','1','2026-05-01 06:15:32',9,'2285d4e6-e08b-47ba-8d85-4ea9f80a8825');
/*!40000 ALTER TABLE `sys_oper_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role` (
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新人',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色编码',
  `role_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  `role_sort` int NOT NULL DEFAULT '1' COMMENT '角色排序',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_fd8cc60f0258a8d5948141d98e` (`role_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
INSERT INTO `sys_role` VALUES ('2026-04-20 21:10:07.256345','2026-04-20 21:10:07.256345','admin','admin','060999e4-ae01-47a8-a0a1-d32b96490e92','admin','系统管理员',1,'1','最高权限'),('2026-04-22 14:01:22.815409','2026-04-22 14:22:19.000000','admin','admin','a6967a5d-d645-48c5-a175-eaa5fb6ba25d','common','普通角色',2,'1','普通角色');
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_menu`
--

DROP TABLE IF EXISTS `sys_role_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role_menu` (
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`,`menu_id`) USING BTREE,
  KEY `IDX_b65fa84413c357d7282153b4a8` (`role_id`) USING BTREE,
  KEY `IDX_543ffcaa38d767909d9022f252` (`menu_id`) USING BTREE,
  CONSTRAINT `FK_543ffcaa38d767909d9022f2522` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_b65fa84413c357d7282153b4a88` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_menu`
--

LOCK TABLES `sys_role_menu` WRITE;
/*!40000 ALTER TABLE `sys_role_menu` DISABLE KEYS */;
INSERT INTO `sys_role_menu` VALUES ('a6967a5d-d645-48c5-a175-eaa5fb6ba25d','2bd7fb00-d6ae-4444-9d69-dc833a3e725f'),('a6967a5d-d645-48c5-a175-eaa5fb6ba25d','83e4eecf-5ef2-461f-9943-8ff7e4600656'),('a6967a5d-d645-48c5-a175-eaa5fb6ba25d','f66ee797-1b85-412c-a1fb-f3aa90a0387b');
/*!40000 ALTER TABLE `sys_role_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
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
  `age` int DEFAULT NULL COMMENT '年龄',
  `login_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '最后登录时间',
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '昵称',
  `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2' COMMENT '性别',
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_9e7164b2f1ea1348bc0eb0a7da` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES ('2026-04-19 02:39:01.392827','2026-05-01 17:00:54.000000','admin','admin','866b0232-507b-42a4-bdc1-47fc4a83616a','admin','$argon2id$v=19$m=65536,t=3,p=4$inTpzf3epiqXwcjgXNNYww$dvIFM+MCgd1oFE5z2XS14KgNct4KrMrtgla+BwOtfwo','18888888888','188@163.com','1',NULL,'2026-05-02 01:00:54','祂','2','系统管理员'),('2026-04-20 03:44:22.291192','2026-04-22 14:09:19.000000','admin','admin','f93176b9-6cc6-4e5a-addc-53257113c383','test','$argon2id$v=19$m=65536,t=3,p=4$7pkc53QbbZg+JCpl+vryVQ$ah5MxOYhytw9jcaQHmGhWZ5TT8KXB+EJLlHDxxAD+ak','19999999999','19999999999@126.com','1',18,NULL,'测试','1','测试角色');
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_role`
--

DROP TABLE IF EXISTS `sys_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user_role` (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`) USING BTREE,
  KEY `IDX_71b4edf9aedbd3e5707156e80a` (`user_id`) USING BTREE,
  KEY `IDX_e8300bfcf561ed417f5f02c677` (`role_id`) USING BTREE,
  CONSTRAINT `FK_71b4edf9aedbd3e5707156e80a2` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_e8300bfcf561ed417f5f02c6776` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_role`
--

LOCK TABLES `sys_user_role` WRITE;
/*!40000 ALTER TABLE `sys_user_role` DISABLE KEYS */;
INSERT INTO `sys_user_role` VALUES ('866b0232-507b-42a4-bdc1-47fc4a83616a','060999e4-ae01-47a8-a0a1-d32b96490e92'),('f93176b9-6cc6-4e5a-addc-53257113c383','a6967a5d-d645-48c5-a175-eaa5fb6ba25d');
/*!40000 ALTER TABLE `sys_user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-01 17:35:47
