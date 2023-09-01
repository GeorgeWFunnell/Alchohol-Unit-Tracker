-- Up

CREATE TABLE Drinks
(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT,
    type TEXT,
    Units INTEGER,
    Alc_Perc  INTEGER,
    Price   REAL
);

CREATE TABLE History(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    TIME TEXT,
    Drink_ID TEXT REFERENCES Drinks(ID),
    Units INTEGER,
    Price REAL
);

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Smirnoff', 'Vodka', '1', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Absolut', 'Vodka', '1', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Grey Goose', 'Vodka', '1', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Jack Daniels', 'Whiskey', '1.4', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Jim Beam', 'Whiskey', '1.4', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Jamerson Irish Whiskey', 'Whiskey', '1.4', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Plymouth', 'Gin', '0.9', '37.5', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('London Dry', 'Gin', '0.9', '37.5', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Navy Strength', 'Gin', '0.9', '37.5', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Stella', 'Beer', '0.24', '5.2', '4');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Guinness', 'Beer', '0.20', '4.3', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Corona', 'Beer', '0.22', '4.6', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Sauvigon Blanc', 'White Wine', '0.570', '13', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Chardonnay', 'White Wine', '0.575', '13.5', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Absolute', 'Red Wine', '1', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Absolute', 'Rum', '1', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Absolute', 'Brandy', '1', '40', '20');

Insert INTO Drinks(name, type, Units, Alc_perc, Price) 
VALUES ('Absolute', 'Tequila', '1', '40', '20');

-- Down

DROP TABLE Drinks;
DROP TABLE History;