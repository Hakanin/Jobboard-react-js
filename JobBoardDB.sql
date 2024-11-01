-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: JobBoardDB
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.24.04.2

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
-- Table structure for table `advertisements`
--

DROP TABLE IF EXISTS `advertisements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advertisements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(75) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(75) DEFAULT NULL,
  `salary` varchar(45) DEFAULT NULL,
  `contract_type` varchar(45) DEFAULT NULL,
  `companyId` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `company_Id_idx` (`companyId`),
  CONSTRAINT `company_Id` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertisements`
--

LOCK TABLES `advertisements` WRITE;
/*!40000 ALTER TABLE `advertisements` DISABLE KEYS */;
INSERT INTO `advertisements` VALUES (2,'Coffee ','make my coffee and don\'t dev','Rio de Janeiro','une ligne sur le CV','CDI 1an',NULL,'2024-10-08 12:51:27'),(5,'Updated ','Updated',NULL,NULL,NULL,NULL,'2024-10-09 16:53:28'),(9,'Lead Dev ','Deviens notre nouveau lead dev','Strasbourg','10000€/mois','CDD',NULL,'2024-10-10 14:28:52'),(12,'fkepfkpk','fekfipe','fjeojf','ojvgeoj','ojveoj',NULL,'2024-10-14 10:30:29'),(13,'new job','ojojojoj','ojojojoj','ojojojo','ojojojo',NULL,'2024-10-19 16:17:02'),(14,'DevOps','Cherche candidat qualifié pour job de Dev Ops','Strasbourg','6000k/','CDI',8,'2024-10-19 16:25:37'),(15,'testjo','okojooj','ojojoij','gcfct','cdtxctrx',8,'2024-10-19 16:30:15'),(16,'coekco','jceiji','ihcieh','ihczih','ihczih',8,'2024-10-19 16:31:27'),(19,'ToyBoy','jfeijifheih','67000','100000000000€','CDE',11,'2024-10-20 14:16:18'),(20,'oveihvi','hivheh','hviheih','lnkkh','kihj',11,'2024-10-20 14:19:29');
/*!40000 ALTER TABLE `advertisements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `message` text,
  `adId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ad_Id_idx` (`adId`),
  KEY `user_Id_idx` (`userId`),
  CONSTRAINT `ad_Id` FOREIGN KEY (`adId`) REFERENCES `advertisements` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_Id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'Thomas','Pozzi','pozzi.tom@gmail.com','0635169199','Je ne suis pas aussi bg que Hakan mais donnez moi une chance svp ',5,NULL,'2024-10-15 16:16:05'),(2,'zizipopo','pozzi','kebab@kebab.com','0606060606','prenez mon zizi',2,8,'2024-10-20 16:59:29');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `description` text NOT NULL,
  `email` varchar(75) NOT NULL,
  `website` varchar(75) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Epitech','Magnifique école','epitech@epitech.eu',NULL,NULL,'2024-10-08 10:38:34'),(2,'Cap Gemini','Grande entreprise','capge@gmail.com',NULL,NULL,'2024-10-08 10:38:34'),(3,'testcompany','test','test@test.com',NULL,'67000','2024-10-19 14:42:24'),(4,'test2','company test','test@testiteste.com',NULL,'67511','2024-10-19 14:46:29'),(5,'t','t','t@t',NULL,'p','2024-10-19 15:03:17'),(6,'c','c','c@c',NULL,'c','2024-10-19 15:05:43'),(7,'b','b','b@b',NULL,'b','2024-10-19 15:11:28'),(8,'abbc','a','a@a',NULL,'a','2024-10-19 15:15:09'),(11,'Epiteuch','ecole de l\'excellence','epiteuch@halkanino.com','epiteuch.ru','67000 STRASBOURG','2024-10-20 14:15:20');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshTokens`
--

DROP TABLE IF EXISTS `refreshTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDuser_idx` (`userId`),
  CONSTRAINT `IDuser` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshTokens`
--

LOCK TABLES `refreshTokens` WRITE;
/*!40000 ALTER TABLE `refreshTokens` DISABLE KEYS */;
INSERT INTO `refreshTokens` VALUES (2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI5NDQ3NjE3fQ.VvUb7xO-Y3S_yqX8MrFEDTxBl2ZJOU7RlHQnwszU6UQ',6),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI5NDQ4NDc2fQ.0lhguGfoLy0JP0QO3RD-8HVTV1lepBdVPi0wUm9Z7X0',6),(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI5NDQ4NTU2fQ.y2oCKCURndmMttI7qY-p7xkwAh3o9jHzeYtLlNTyhF4',6),(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI5NDUxNDEwLCJleHAiOjE3Mjk0NTE0NDB9.C9GCOuhpHZhBC96_IYTq_s9JLp25FUwjUAobrCaoP44',6),(32,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI5NDUxNTgwLCJleHAiOjE3Mjk0NTE2MTB9.EtPBZYJ6wjOTpgxzqgTIdtYiCqY42V5ijSei66BSrt0',6),(35,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI5NDU5Nzg2LCJleHAiOjE3Mjk0NTk4MTZ9.opLyPs4A9JW5GmlFh1GTOitjbaBSWMqt7f-E7ibnfpM',6);
/*!40000 ALTER TABLE `refreshTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  `companyId` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `company_id_idx` (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Thomas','Pozzi','thomaspozzi','tp1234','pozzi.tom@gmail.com','0635169164','25 Place Henri Dunant','',NULL,'2024-10-14 14:17:25'),(2,'Hakan','Inan','bgdu67','hakan1234','hakanbisou@epitech.eu','0606060606','17 rue du bisou - 67000 Strasbourg','',NULL,'2024-10-14 14:18:40'),(3,'Jean-Paul','Nottet','jplecoach','$2b$10$X9qtA0iJ2e2JsyGwrNQ.yOD/SdQLu6DBvsh5KBf0F1Imim9CqInjS','jpcoach@gmail.com',NULL,NULL,'',NULL,'2024-10-14 16:38:39'),(4,'Jeanmichmich','Dupich','bgdu68','$2b$10$eiC9at1Q8PVg3AdSiI2s2uKQOa9wf96t4z0NPdUzrsGEh50tdKAb2','jeanmichpich','0603134646',NULL,'',NULL,'2024-10-17 11:35:36'),(5,'testifl','test','role','$2b$10$NLZUA.GWr5T00d5ltP3XcOSTb6hoTOVl0E72HmZNRwQO8J1PFsdtS','test@test.com','0364646464','12 rue du bisou','jobSeeker',NULL,'2024-10-18 15:44:14'),(6,'company','test','company','$2b$10$MgaQm5eYuouSrYgiMGTGiOUzFPtM9dW597vvByAxKsfzZtoQL8Mnu','company@company.com','0606060606',NULL,'professional',8,'2024-10-19 13:29:37'),(7,'Hakanino','lebg','hakantrobo','$2b$10$HyiqHuCwf1Ps5qITwx8A3uL8Qi26CWeRBixjj30a/hMBkuP6WKena','hakan@bg.com','0606060606',NULL,'professional',11,'2024-10-20 14:13:20'),(8,'zozopipi','pozzi','toto','$2b$10$kN0dztwP7ZgOOCAZ2NbNNeo6ItKDQtnhJUpe0x2jnXPgW6p.Znp5S','kebab@kebab.com','0606060606',NULL,'jobSeeker',NULL,'2024-10-20 16:21:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-20 23:35:58
