CREATE TABLE `question` (
  `id` VARCHAR(255) NOT NULL,
  `questionText` TEXT NOT NULL,
  `correctAnswer` VARCHAR(255) NOT NULL,
  `timeLimit` INT NOT NULL,
  `points` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `flagguessingquestion` (
  `id` varchar(255) NOT NULL,
  `flagPath` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `flagguessingquestion_ibfk_1` FOREIGN KEY (`id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mathquestion` (
  `id` varchar(255) NOT NULL,
  `expression` text NOT NULL,
  `options` json NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `mathquestion_ibfk_1` FOREIGN KEY (`id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `countryflagmatchingquestion` (
  `id` varchar(255) NOT NULL,
  `flagOptions` json NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `countryflagmatchingquestion_ibfk_1` FOREIGN KEY (`id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `wordgeneratorquestion` (
  `id` varchar(255) NOT NULL,
  `letters` json NOT NULL,
  `dictionary` json NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `wordgeneratorquestion_ibfk_1` FOREIGN KEY (`id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO Question (id, questionText, correctAnswer, timeLimit, points) VALUES('q70', 'Form a valid word using the provided letters.', 'Rain', 60, 10);
INSERT INTO WordGeneratorQuestion (id, letters, dictionary) VALUES('q70', 
 '["A", "B", "C", "E", "G", "H", "I", "N", "R", "T"]', 
 '["Ant", "Cat", "Eat", "Bat", "Cab", "Heart", "Rain", "Bent", "Gain", "Branch"]');
 
INSERT INTO `quizz`.`question`(`id`,`questionText`,`correctAnswer`,`timeLimit`,`points`) VALUES("q5","WhichCountry does this flag belong to","serbia","10","10");
INSERT INTO `quizz`.`flagguessingquestion`(`id`, `flagPath`)VALUES("q5", "1724620319347-serbia.png");
INSERT INTO `quizz`.`question`(`id`,`questionText`,`correctAnswer`,`timeLimit`,`points`) VALUES('053d32b8-bc2f-4c23-992b-ac143690a2f4', 'Find X', '2', '20', '10');
INSERT INTO `quizz`.`mathquestion`(`id`, `expression`,`options`)VALUES('053d32b8-bc2f-4c23-992b-ac143690a2f4', 'x+1=3', '[\"2\", \"41\", \"1\", \"8\"]');
INSERT INTO `quizz`.`question`(`id`,`questionText`,`correctAnswer`,`timeLimit`,`points`) VALUES('q3', 'What is the flag of China', '1724620319349-china.png', '45', '20');
INSERT INTO `quizz`.`countryflagmatchingquestion`(`id`, `flagOptions`)VALUES('q3', '[\"1724620319347-serbia.png\", \"1724620319349-austria.png\", \"1724620319349-china.png\"]');
