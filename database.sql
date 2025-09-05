-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: quanlikhohang
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Đồ uống'),(2,'Thực phẩm'),(3,'Đồ gia dụng'),(4,'Thiết bị điện tử');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_details`
--

DROP TABLE IF EXISTS `export_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `export_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `sell_price` decimal(10,2) NOT NULL,
  `subtotal` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Export_Details_product_id_export_id_unique` (`export_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `export_details_ibfk_1` FOREIGN KEY (`export_id`) REFERENCES `export_orders` (`export_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `export_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_details`
--

LOCK TABLES `export_details` WRITE;
/*!40000 ALTER TABLE `export_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_orders`
--

DROP TABLE IF EXISTS `export_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_orders` (
  `export_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `export_date` date DEFAULT NULL,
  `total_amount` decimal(12,2) DEFAULT NULL,
  `notes` text,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  PRIMARY KEY (`export_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_orders`
--

LOCK TABLES `export_orders` WRITE;
/*!40000 ALTER TABLE `export_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_details`
--

DROP TABLE IF EXISTS `import_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `import_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `import_price` decimal(10,2) NOT NULL,
  `manufacturing_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Import_Details_product_id_import_id_unique` (`import_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `import_details_ibfk_1` FOREIGN KEY (`import_id`) REFERENCES `import_orders` (`import_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `import_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_details`
--

LOCK TABLES `import_details` WRITE;
/*!40000 ALTER TABLE `import_details` DISABLE KEYS */;
INSERT INTO `import_details` VALUES (1,1,3,1,7000.00,'2025-08-13','2026-08-13'),(2,1,5,1,2500.00,'2025-08-13','2026-08-13'),(3,2,1,10,6000.00,'2025-08-13','2026-08-13'),(4,2,2,10,5500.00,'2025-08-13','2026-08-13');
/*!40000 ALTER TABLE `import_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_orders`
--

DROP TABLE IF EXISTS `import_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_orders` (
  `import_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `import_date` date DEFAULT NULL,
  `total_amount` decimal(12,2) DEFAULT NULL,
  `notes` text,
  `status` enum('pending','approved','cancelled') DEFAULT 'pending',
  PRIMARY KEY (`import_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `import_orders_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_orders`
--

LOCK TABLES `import_orders` WRITE;
/*!40000 ALTER TABLE `import_orders` DISABLE KEYS */;
INSERT INTO `import_orders` VALUES (1,1,'2025-08-13',9500.00,'vip','approved'),(2,1,'2025-08-13',115000.00,'vip','approved');
/*!40000 ALTER TABLE `import_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `description` text,
  `category_id` int DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `import_price` decimal(10,2) NOT NULL,
  `sell_price` decimal(10,2) NOT NULL,
  `stock_quantity` int DEFAULT '0',
  `min_stock` int DEFAULT '0',
  `created_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_10` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_11` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_12` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_13` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_14` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_15` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_16` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_17` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_18` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_19` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_20` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_21` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_22` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_23` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_24` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_25` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_26` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_27` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_28` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_29` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_30` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_31` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_5` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_6` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_7` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_8` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Coca-Cola Lon 330ml','Nước giải khát có gas Coca-Cola',1,'lon',6000.00,10000.00,210,50,'2025-08-13','active'),(2,'Pepsi Lon 330ml','Nước giải khát có gas Pepsi',1,'lon',5500.00,9500.00,190,50,'2025-08-13','active'),(3,'Trà Xanh Không Độ 500ml','Nước giải khát trà xanh đóng chai',1,'chai',7000.00,12000.00,151,40,'2025-08-13','active'),(4,'Bánh Oreo 133g','Bánh quy kẹp kem Oreo vị vani',2,'gói',12000.00,20000.00,100,20,'2025-08-13','active'),(5,'Mì Hảo Hảo Tôm Chua Cay 75g','Mì ăn liền hương vị tôm chua cay',2,'gói',2500.00,5000.00,501,100,'2025-08-13','active'),(6,'Gạo ST25 5kg','Gạo thơm ST25 đặc sản Sóc Trăng',2,'bao',75000.00,110000.00,80,20,'2025-08-13','active'),(7,'Nước Mắm Nam Ngư 500ml','Nước mắm truyền thống Nam Ngư',2,'chai',12000.00,20000.00,90,20,'2025-08-13','active'),(8,'Máy Sấy Tóc Panasonic EH-ND21','Máy sấy tóc công suất 1200W',4,'cái',250000.00,350000.00,30,5,'2025-08-13','active'),(9,'Ấm Siêu Tốc Philips 1.7L','Ấm đun siêu tốc Philips HD9306',4,'cái',400000.00,550000.00,20,5,'2025-08-13','active'),(10,'Quạt Bàn Asia B16001','Quạt bàn Asia công suất 45W',4,'cái',300000.00,450000.00,15,5,'2025-08-13','active'),(11,'Bột Giặt OMO 3kg','Bột giặt OMO Matic cho máy giặt cửa trên',3,'túi',75000.00,120000.00,60,10,'2025-08-13','active'),(12,'Nước Rửa Chén Sunlight 1.5L','Nước rửa chén Sunlight hương chanh',3,'chai',25000.00,45000.00,70,15,'2025-08-13','active'),(13,'Sữa Tươi Vinamilk 1L','Sữa tươi tiệt trùng không đường',2,'hộp',25000.00,40000.00,90,20,'2025-08-13','active'),(14,'Trứng Gà 10 Quả','Trứng gà sạch đóng vỉ 10 quả',2,'vỉ',20000.00,35000.00,100,20,'2025-08-13','active'),(15,'Khăn Giấy Pulppy 3 Lớp','Khăn giấy rút Pulppy 3 lớp',3,'hộp',15000.00,30000.00,85,20,'2025-08-13','active');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text,
  `tax_code` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Công ty TNHH Coca-Cola Việt Nam','Nguyễn Văn A','0901234567','contact@coca-cola.vn','Xa Lộ Hà Nội, Thủ Đức, TP.HCM','0301234567','active'),(2,'Công ty TNHH Suntory PepsiCo Việt Nam','Trần Thị B','0902345678','info@pepsico.com.vn','KCN Amata, Biên Hòa, Đồng Nai','0302345678','active'),(3,'Công ty CP Tập đoàn KIDO','Lê Văn C','0903456789','sales@kido.vn','P. Bến Nghé, Quận 1, TP.HCM','0303456789','active'),(4,'Công ty CP Acecook Việt Nam','Phạm Thị D','0904567890','info@acecookvietnam.vn','Lô II-3, KCN Tân Bình, TP.HCM','0304567890','active'),(5,'Công ty CP Lương thực Tiền Giang','Nguyễn Văn E','0905678901','sales@tiengiangfood.vn','KCN Mỹ Tho, Tiền Giang','0305678901','active'),(6,'Công ty CP Masan Consumer','Lê Thị F','0906789012','info@masanconsumer.com','P. Nguyễn Cư Trinh, Quận 1, TP.HCM','0306789012','active'),(7,'Công ty TNHH Panasonic Việt Nam','Trần Văn G','0907890123','contact@vn.panasonic.com','KCN Thăng Long, Đông Anh, Hà Nội','0307890123','active'),(8,'Công ty TNHH Philips Việt Nam','Nguyễn Thị H','0908901234','support@philips.com.vn','P. Tân Định, Quận 1, TP.HCM','0308901234','active'),(9,'Công ty CP Quạt điện Asia','Phạm Văn I','0909012345','info@asiafan.com.vn','KCN Vĩnh Lộc, Bình Tân, TP.HCM','0309012345','active'),(10,'Công ty TNHH Unilever Việt Nam','Lê Thị J','0910123456','contact@unilever.com.vn','KCN Tây Bắc Củ Chi, TP.HCM','0309123456','active'),(11,'Công ty TNHH P&G Việt Nam','Nguyễn Văn K','0911234567','info@pg.com.vn','P. Bến Thành, Quận 1, TP.HCM','0309234567','active'),(12,'Công ty CP Sữa Vinamilk','Trần Thị L','0912345678','contact@vinamilk.com.vn','36-38 Ngô Đức Kế, Quận 1, TP.HCM','0309345678','active'),(13,'Công ty TNHH Ba Huân','Nguyễn Văn M','0913456789','sales@bahuan.vn','Ấp 1, Xã Bình Chánh, TP.HCM','0309456789','active'),(14,'Công ty TNHH Pulppy Việt Nam','Phạm Thị N','0914567890','info@pulppy.vn','KCN VSIP 1, Thuận An, Bình Dương','0309567890','active'),(15,'Công ty CP Tập đoàn Lộc Trời','Lê Văn O','0915678901','contact@loctroi.vn','Tầng 8, 41 Nguyễn Thị Minh Khai, Quận 1, TP.HCM','0309678901','active'),(16,'update 1','adam','123','jhg','ass','123','active');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-05 10:00:58
