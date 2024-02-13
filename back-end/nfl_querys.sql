use nflplays;
SELECT * FROM playdata;
insert into playdata (gameId, playId) values (3,4);
drop table plays;
CREATE TABLE `nflplays`.`plays` (
  `gameId` INT NOT NULL,
  `playId` INT NOT NULL,
  `ballCarrierId` INT NULL,
  `ballCarrierDisplayName` VARCHAR(45) NULL,
  `playDescription` VARCHAR(45) NULL,
  `quarter` INT NULL,
  `down` INT NULL,
  `yardsToGo` INT NULL,
  `possessionTeam` VARCHAR(3) NULL,
  `defensiveTeam` VARCHAR(3) NULL,
  `yardlineSide` VARCHAR(3) NULL,
  `yardlineNumber` INT NULL,
  `gameClock` VARCHAR(5) NULL,
  `preSnapHomeScore` INT NULL,
  `preSnapVisitorScore` INT NULL,
  `passResult` VARCHAR(5) NULL,
  `passLength` FLOAT NULL,
  `penaltyYards` FLOAT NULL,
  `prePenaltyPlayResult` INT NULL,
  `playResult` INT NULL,
  `playNullifiedByPenalty` VARCHAR(1) NULL,
  `absoluteYardlineNumber` INT NULL,
  `offenseFormation` VARCHAR(45) NULL,
  `defendersInTheBox` FLOAT NULL,
  `passProbability` FLOAT NULL,
  `preSnapHomeTeamWinProbability` FLOAT NULL,
  `preSnapVisitorTeamWinProbability` FLOAT NULL,
  `homeTeamWinProbabilityAdded` FLOAT NULL,
  `visitorTeamWinProbilityAdded` FLOAT NULL,
  `expectedPoints` FLOAT NULL,
  `expectedPointsAdded` FLOAT NULL);
  
  CREATE TABLE `nflplays`.`games` (
  `gameId` INT NOT NULL,
  `season` INT NULL,
  `week` INT NULL,
  `gameDate` VARCHAR(45) NULL,
  `gameTimeEastern` VARCHAR(45) NULL,
  `homeTeamAbbr` VARCHAR(3) NULL,
  `visitorTeamAbbr` VARCHAR(3) NULL,
  `homeFinalScore` INT NULL,
  `visitorFinalScore` INT NULL,
  PRIMARY KEY (`gameId`));
  
  
  INSERT INTO `nflplays`.`plays`
(`gameId`,
`playId`,
`ballCarrierId`,
`ballCarrierDisplayName`,
`playDescription`,
`quarter`,
`down`,
`yardsToGo`,
`possessionTeam`,
`defensiveTeam`,
`yardlineSide`,
`yardlineNumber`,
`gameClock`,
`preSnapHomeScore`,
`preSnapVisitorScore`,
`passResult`,
`passLength`,
`penaltyYards`,
`prePenaltyPlayResult`,
`playResult`,
`playNullifiedByPenalty`,
`absoluteYardlineNumber`,
`offenseFormation`,
`defendersInTheBox`,
`passProbability`,
`preSnapHomeTeamWinProbability`,
`preSnapVisitorTeamWinProbability`,
`homeTeamWinProbabilityAdded`,
`visitorTeamWinProbilityAdded`,
`expectedPoints`,
`expectedPointsAdded`)
VALUES
(<{gameId: }>,
<{playId: }>,
<{ballCarrierId: }>,
<{ballCarrierDisplayName: }>,
<{playDescription: }>,
<{quarter: }>,
<{down: }>,
<{yardsToGo: }>,
<{possessionTeam: }>,
<{defensiveTeam: }>,
<{yardlineSide: }>,
<{yardlineNumber: }>,
<{gameClock: }>,
<{preSnapHomeScore: }>,
<{preSnapVisitorScore: }>,
<{passResult: }>,
<{passLength: }>,
<{penaltyYards: }>,
<{prePenaltyPlayResult: }>,
<{playResult: }>,
<{playNullifiedByPenalty: }>,
<{absoluteYardlineNumber: }>,
<{offenseFormation: }>,
<{defendersInTheBox: }>,
<{passProbability: }>,
<{preSnapHomeTeamWinProbability: }>,
<{preSnapVisitorTeamWinProbability: }>,
<{homeTeamWinProbabilityAdded: }>,
<{visitorTeamWinProbilityAdded: }>,
<{expectedPoints: }>,
<{expectedPointsAdded: }>);

use nflplays;
select count(*) from plays;

SELECT possessionTeam, AVG(playResult) from plays group by possessionTeam;

select * from games where homeTeamAbbr = 'BUF' or visitorTeamAbbr = 'BUF';

Select * FROM (
select homeTeamAbbr, AVG(homeFinalScore), AVG(visitorFinalScore) from games group by homeTeamAbbr) AS asdf;

SELECT week, (AVG(homeFinalScore) + AVG(visitorFinalScore))/2 as avg_score from games where homeTeamAbbr = 'PHI' or visitorTeamAbbr = 'PHI' group by week;

SELECT week, (AVG(homeFinalScore) + AVG(visitorFinalScore))/2 as avg_score from games group by week;

SELECT DISTINCT homeTeamAbbr from games;

INSERT INTO `nflplays`.`games`
(`gameId`,
`season`,
`week`,
`gameDate`,
`gameTimeEastern`,
`homeTeamAbbr`,
`visitorTeamAbbr`,
`homeFinalScore`,
`visitorFinalScore`)
VALUES
(<{gameId: }>,
<{season: }>,
<{week: }>,
<{gameDate: }>,
<{gameTimeEastern: }>,
<{homeTeamAbbr: }>,
<{visitorTeamAbbr: }>,
<{homeFinalScore: }>,
<{visitorFinalScore: }>);



SELECT plays.gameId, plays.playId, plays.quarter, plays.gameClock, plays.possessionTeam, plays.playResult 
FROM nflplays.plays as plays 
WHERE plays.gameId = 2022100908 
ORDER BY plays.quarter ASC, plays.gameClock DESC;


/*		AVERAGE STATISTICS PER TEAM		*/
SELECT * FROM  nflplays.games as games;
SELECT * FROM nflplays.plays;

DROP VIEW yards_and_score;

CREATE VIEW yards_and_score AS
SELECT plays.gameId, plays.possessionTeam AS team, plays.total_yards,
	CASE
		WHEN plays.possessionTeam = games.homeTeamAbbr THEN games.homeFinalScore
		WHEN plays.possessionTeam = games.visitorTeamAbbr THEN games.visitorFinalScore
	END AS score
FROM 
	(SELECT plays.gameId, plays.possessionTeam, SUM(plays.playResult) as total_yards 
	FROM nflplays.plays as plays
	GROUP BY plays.possessionTeam, plays.gameId
	ORDER BY plays.gameId) as plays
LEFT JOIN nflplays.games as games
    ON plays.gameId=games.gameID;

SELECT * FROM nflplays.yards_and_score;

CREATE VIEW avg_data AS
SELECT *, (avg_data.avg_yards/avg_data.avg_score) AS yrd_per_pnt 
FROM
	(SELECT yrd_scr.team, AVG(yrd_scr.total_yards) AS avg_yards, AVG(yrd_scr.score) AS avg_score
	FROM yards_and_score AS yrd_scr
	GROUP BY yrd_scr.team)
AS avg_data;

SELECT * FROM nflplays.avg_data;

SELECT AVG(avg_data.avg_yards) AS yards, AVG(avg_data.avg_score) AS score, AVG(avg_data.yrd_per_pnt) AS yrd_per_pnt FROM nflplays.avg_data;



