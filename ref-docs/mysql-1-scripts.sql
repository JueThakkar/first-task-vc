CREATE DATABASE IF NOT EXISTS `filedb`;
CREATE USER IF NOT EXISTS 'filedb-user'@'localhost' IDENTIFIED BY 'nomik4$QNVj9jgGT';
GRANT ALL ON `filedb`.* TO 'filedb-user'@'localhost';

use taskdb;

CREATE TABLE `filedetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_path` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
