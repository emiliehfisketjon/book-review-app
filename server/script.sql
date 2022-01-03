

CREATE TABLE `users`.`users` (
  `email` VARCHAR(20) NOT NULL,
  `firstname` VARCHAR(20) NULL,
  `lastname` VARCHAR(20) NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`email`));