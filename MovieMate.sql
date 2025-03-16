Use Master
go

Create Database MovieMate
go
Use MovieMate
go

Create Table Rating(
RatingID int Primary Key,
IMDbRating float,
Review varchar(100)
)

Create Table Movie(
MovieID int Primary Key,
Title varchar(30),
MovieType varchar(20),       --e.g. HollyWood,BollyWood,Punjabi
Genre varchar(20),
Duration Time,
RatingID int,                --FK
Foreign Key (RatingID) references Rating(RatingID) On Delete set Null On Update Cascade
);

Create Table SeatRecord(           --Each Theater Has a Seat Record
SeatRecordID int Primary Key,
TotalSeats int,
AvailableSeats int,
OccupiedSeats int,
MaleCount int,
FemaleCount int
);

Create Table Theater(
TheaterID int Primary Key,
ScreenType varchar(20),            --e.g. Gold,Platinum,Silver
SeatRecordID int,                  --FK
Foreign Key (SeatRecordID) references SeatRecord(SeatRecordID) On Delete Cascade On Update Cascade
);

Create Table Seat(                --Seat of Customer in a Theater hall
SeatNumber int Primary Key,
TheaterID int,                    --FK
RowNumber int,
Foreign Key(TheaterID) references Theater(TheaterID)
);

Create Table Prices(
PriceID int Primary Key,
Category varchar(20),           --e.g. Student,Bachelor
Amount float
);

Create Table ShowTimings(
ShowTimeID int Primary Key,
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
UserID int Primary Key,
UserName varchar(30),
Email varchar(30),
UserPassword char(10),
UserType varchar(30)               --e.g. Customer,Admin,Employee
);

Create Table Payment(
PaymentID int Primary Key,
PaymentStatus varchar(20),         --Paid or UnPaid
PaymentMethod varchar(20),         --Online or Cash
PaymentTime Time
);

Create Table Bookings(
BookingID int Primary Key,
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
go
Create Procedure AddMovie
@MovieID int,
@Title varchar(50),
@MovieType varchar(20),
@Genre varchar(20),
@Duration Time
as begin

if exists (Select * from Movie where @MovieID = MovieID)
begin
print('Insertion Failed as Movie ID already exists in database');
end

else
begin
Insert into Movie (MovieID,Title,MovieType,Genre,Duration)
values(@MovieID,@Title,@MovieType,@Genre,@Duration);
end

end
go

exec AddMovie 1,'Batman vs SuperMan','HollyWood','Action','02:50:00';
exec AddMovie 2,'Pathan','BollyWood','Thriller','03:10:00';

--2, Admin can Add IMDB ratings of each movie
go
Create Procedure AddIMDb
@RatingID int,
@IMDbRating float,
@Review varchar(100),
@MovieName varchar(30)
as begin

if exists (Select * from Movie where Title = @MovieName)
begin
Insert into Rating
values(@RatingID,@IMDbRating,@Review);
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
go

exec AddIMDb 1,6.7,'Batman finds about Superman Secret...','Batman vs SuperMan';

--3 Admin can Remove Movie from list
go
Create Procedure RemoveMovie
@MovieName varchar(30)
as begin

if exists (Select * from Movie where Title = @MovieName)
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
go

exec RemoveMovie 'Pathan';

--4 Admin can Update IMDb rating of a movie
go
Create Procedure UpdateIMDb
@MovieName varchar(30),
@NewRating float
as begin

if exists (Select * from Movie where Title = @MovieName and RatingID is not Null)
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
go

exec UpdateIMDb 'Batman vs SuperMan',7.9;

--5 Admin can Add Theaters information
go
Create Procedure AddTheaters
@ID int,
@ScreenType varchar(10)
as begin

if @ScreenType in('Gold','Silver','Platinum','Bronze')
begin
Insert into Theater (TheaterID,ScreenType)
values(@ID,@ScreenType);
end

else
begin
print('Unable to Add Theater in Database');
end

end
go

exec AddTheaters 1,'Gold';

--6 Admin can add SeatRecord for a theater
go
Create Procedure AddSeatRecord
@ID int,
@Total int
as begin

if (@Total>100 and @Total<=800)
begin
Insert into SeatRecord
values(@ID,@Total,0,0,0,0);
end

else
begin
print('Seats out of Range');
end

end
go