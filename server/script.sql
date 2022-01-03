

CREATE TABLE `users`.`users` (
  `email` VARCHAR(20) NOT NULL,
  `firstname` VARCHAR(20) NULL,
  `lastname` VARCHAR(20) NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`email`));

  CREATE TABLE `books`.`books` (
    `id_user` INT NOT NULL AUTO_INCREMENT, 
    `email` VARCHAR(45) NOT NULL, 
    `title` VARCHAR(45) NOT NULL, 
    `author` VARCHAR(45) NOT NULL, 
    `review` VARCHAR(200) NOT NULL, 
    `stars` INT NOT NULL, 
    `date` VARCHAR(10) NOT NULL, 
    `filename` VARCHAR(25) NOT NULL, 
    PRIMARY KEY (`id_user`));