/*
 Navicat Premium Data Transfer

 Source Server         : 新帮手
 Source Server Type    : MySQL
 Source Server Version : 50554
 Source Host           : 47.99.164.101
 Source Database       : help_test

 Target Server Type    : MySQL
 Target Server Version : 50554
 File Encoding         : utf-8

 Date: 03/23/2020 14:51:30 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `ob_subscribe_message`
-- ----------------------------
DROP TABLE IF EXISTS `ob_subscribe_message`;
CREATE TABLE `ob_subscribe_message` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT '' COMMENT '标题',
  `template_id` varchar(255) DEFAULT '' COMMENT '订阅消息模板id',
  `create_time` int(10) DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='订阅消息表';

SET FOREIGN_KEY_CHECKS = 1;
