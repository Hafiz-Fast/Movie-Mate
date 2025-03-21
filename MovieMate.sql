Use Master
go

Create Database MovieMate
go
Use MovieMate
go

Create Table Rating(
RatingID int Identity(1,1) Primary Key,
IMDbRating float,
Review varchar(100)
)

Create Table Movie(
MovieID int Identity(1,1) Primary Key,
Title varchar(30),
MovieType varchar(20),       --e.g. HollyWood,BollyWood,Punjabi
Genre varchar(20),
Duration Time,
RatingID int,                --FK
Foreign Key (RatingID) references Rating(RatingID) On Delete set Null On Update Cascade
);

Create Table SeatRecord(           --Each Theater Has a Seat Record
SeatRecordID int Identity(1,1) Primary Key,
TotalSeats int,
AvailableSeats int,
OccupiedSeats int,
MaleCount int,
FemaleCount int
);

Create Table Theater(
TheaterID int Identity(1,1) Primary Key,
ScreenType varchar(20),            --e.g. Gold,Platinum,Silver
SeatRecordID int,                  --FK
Foreign Key (SeatRecordID) references SeatRecord(SeatRecordID) On Delete Cascade On Update Cascade
);

Create Table Seat(                --Seat of Customer in a Theater hall
SeatNumber int Identity(1,1) Primary Key,
TheaterID int,                    --FK
RowNumber int,
Foreign Key(TheaterID) references Theater(TheaterID)
);

Create Table Prices(
PriceID int Identity(1,1) Primary Key,
Category varchar(20),           --e.g. Student,Bachelor
Amount float
);

Create Table ShowTimings(
ShowTimeID int Identity(1,1) Primary Key,
MovieID int,                   --FK
TheaterID int,                 --FK
ShowDate Date,
ShowTiming Time,
PriceID int,                   --FK
Foreign Key(MovieID) references Movie(MovieID),
Foreign Key(TheaterID) references Theater(TheaterID),
Foreign Key(PriceID) references Prices(PriceID),
);

Create Table Users(
UserID int Identity(1,1) Primary Key,
UserName varchar(30),
Email varchar(30),
UserPassword char(10),
UserType varchar(30)               --e.g. Customer,Admin,Employee
);

Create Table Payment(
PaymentID int Identity(1,1) Primary Key,
PaymentStatus varchar(20),         --Paid or UnPaid
PaymentMethod varchar(20),         --Online or Cash
PaymentTime Time
);

Create Table Bookings(
BookingID int Identity(1,1) Primary Key,
UserID int,                   --FK
SeatNumber int,               --FK
ShowTimeID int,               --FK
PaymentID int,                --FK
Foreign Key (SeatNumber) references Seat(SeatNumber),
Foreign Key (ShowTimeID) references ShowTimings(ShowTimeID),
Foreign Key (UserID) references Users(UserID),
Foreign Key (PaymentID) references Payment(PaymentID)
);

Create Table UserReview(
UserID int,
MovieID int,
Review varchar(100),
Foreign Key(UserID) references Users(UserID),
Foreign Key(MovieID) references Movie(MovieID),
Primary Key(UserID,MovieID)
)

--Additional Constraints
Alter Table Movie
Add constraint df_id
Default(NULL) for RatingID;

Alter Table Theater
Add constraint df_seatid
Default(Null) for SeatRecordID;

--Schema View
Select * from Movie;
Select * from Theater;
Select * from SeatRecord;
Select * from Seat;
Select * from ShowTimings;
Select * from Prices;
Select * from Bookings;
Select * from Users;
Select * from Payment;
Select * from Rating;
Select * from UserReview;

--Admin Functionalities
--1, Admin can add movies
GO
Create Procedure AddMovie
@Title varchar(50),
@MovieType varchar(20),
@Genre varchar(20),
@Duration Time
as begin

if exists (Select * from Movie where @Title = Title)
begin
print('Insertion Failed as Movie with this title already exists in database');
end

else
begin
Insert into Movie (Title,MovieType,Genre,Duration)
values(@Title,@MovieType,@Genre,@Duration);
end

end
GO

exec AddMovie 'Batman vs SuperMan','HollyWood','Action','02:50:00';
exec AddMovie 'Pathan','BollyWood','Thriller','03:10:00';

--2, Admin can Add IMDB ratings of each movie
GO
Create Procedure AddIMDb
@IMDbRating float,
@Review varchar(100),
@MovieName varchar(30)
as begin

if exists (Select * from Movie where Title = @MovieName)
begin
Insert into Rating (IMDbRating,Review)
values(@IMDbRating,@Review);

--Get the newly inserted identity
DECLARE @RatingID int;
Set @RatingID = SCOPE_IDENTITY();

Update Movie
Set RatingID = @RatingID
where Title = @MovieName;
print('IMDb rating added successfully');
end

else
begin
print('IMDb rating insertion failed');
end

end
Go

exec AddIMDb 6.7,'Batman finds about Superman Secret...','Batman vs SuperMan';

--3 Admin can Remove Movie from list
GO
Create Procedure RemoveMovie
@MovieName varchar(30)
as begin

if exists (Select 1 from Movie where Title = @MovieName)
begin
Delete from Movie
where Title = @MovieName;
print('Movie Removed Successfully');
end

else
begin
print('Movie does not exist');
end

end
GO

exec RemoveMovie 'Pathan';

--4 Admin can Update IMDb rating of a movie
GO
Create Procedure UpdateIMDb
@MovieName varchar(30),
@NewRating float
as begin

if exists (Select 1 from Movie where Title = @MovieName and RatingID is not Null)
begin
declare @RatingID int
Select @RatingID = RatingID from Movie
where Title = @MovieName;

Update Rating
Set IMDbRating = @NewRating
where RatingID = @RatingID;
print('IMDb Rating updated successfully!');
end

else
begin
print('Unable to update IMDb');
end

end
GO

exec UpdateIMDb 'Batman vs SuperMan',7.9;

--5 Admin can Add Theaters information
GO
Create Procedure AddTheaters
@ScreenType varchar(10)
as begin

if @ScreenType in('Gold','Silver','Platinum','Bronze')
begin
Insert into Theater (ScreenType)
values(@ScreenType);
end

else
begin
print('Unable to Add Theater in Database');
end

end
GO

exec AddTheaters 'Gold';

--6 Admin can add SeatRecord for a theater
GO
Create Procedure AddSeatRecord
@Total int
as begin

if (@Total>100 and @Total<=800)
begin
Insert into SeatRecord (TotalSeats,AvailableSeats,OccupiedSeats,MaleCount,FemaleCount)
values(@Total,@Total,0,0,0);
end

else
begin
print('Seats out of Range');
end

end
GO

exec AddSeatRecord 200;