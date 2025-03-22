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

Alter Table ShowTimings
Add constraint df_priceid
Default(NULL) for PriceID;

Alter Table Bookings
Add constraint df_paymentid
DEFAULT(NULL) for PaymentID;

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
@Total int,
@TheaterID int
as begin

if not exists(Select 1 from Theater where TheaterID = @TheaterID)
BEGIN
print('Insertion failed as Theater not found');
END

if (@Total>100 and @Total<=800)
begin
Insert into SeatRecord (TotalSeats,AvailableSeats,OccupiedSeats,MaleCount,FemaleCount)
values(@Total,@Total,0,0,0);

declare @SeatRecordID int;
set @SeatRecordID = SCOPE_IDENTITY();

Update Theater
set SeatRecordID = @SeatRecordID
where TheaterID = @TheaterID;
end

else
begin
print('Seats out of Range');
end

end
GO

exec AddSeatRecord 200,1

--7 Admin can add Show Timings for a movie
GO
Create Procedure AddShowTimings
@MovieID int,
@TheaterID int,
@Date date,
@ShowTime TIME
as BEGIN

if not exists(Select 1 from Movie where @MovieID = MovieID)
BEGIN
print('Insertion failed as movie was not found');
end

else if not exists(Select 1 from Theater where @TheaterID = TheaterID)
BEGIN
print('Insertion failed as theater was not found');
END

else
BEGIN
Insert into ShowTimings (MovieID,TheaterID,ShowDate,ShowTiming)
values (@MovieID,@TheaterID,@Date,@ShowTime);
end

END
GO

exec AddShowTimings 1,1,'2025-07-15','11:30:00';
Select * from ShowTimings;

--8 Admin can add Prices for a Specific Show
GO
Create Procedure AddShowPrice
@Category varchar(20),
@Amount FLOAT,
@ShowID int
as BEGIN

if @Category not in ('Student','Bachelor','Children','Old')
BEGIN
print('Insertion failed as no such category exists');
Return;
END

if exists(Select 1 from ShowTimings where @ShowID = ShowTimeID)
BEGIN

--Giving Discounts according to Specific Categories
if (@Category = 'Student')
BEGIN
set @Amount = @Amount * (20.0/100);
END

else if (@Category = 'Children')
BEGIN
set @Amount = @Amount * (10.0/100);
END

else if (@Category = 'Old')
BEGIN
set @Amount = @Amount * (15.0/100);
END

Insert into Prices (Category,Amount)
values (@Category,@Amount);

declare @CurrentPriceID int;
Set @CurrentPriceID = SCOPE_IDENTITY();

Update ShowTimings
set PriceID = @CurrentPriceID
where ShowTimeID = @ShowID;

END

ELSE
BEGIN
print('Insertion failed as show was not found');
end

END
GO

exec AddShowPrice 'Student',750.00,1;
Select * from Prices;
Select * from ShowTimings;

--9 Admin can take Movie or Show related details from user to book him a show
GO
Create Procedure UserBooking
@UserID int,
@Moviename varchar(30),
@ScreenType varchar(20),
@ShowDate Date,
@MovieTiming time,
@Rownumber int
as BEGIN

if not exists(Select 1 from Users where @UserID = UserID)
BEGIN
print('Booking failed as User does not exist in our database');
Return;
END

if not exists(Select 1 from Movie where @Moviename = Title)
BEGIN
print('Booking failed as Movie does not exist in our database');
Return;
END

if not exists(Select 1 from Theater where @ScreenType = ScreenType)
BEGIN
print('Booking failed as we not have theaters with this ScreenTyoe');
Return;
END

--Now check if given movie is being displayed on Given Screen Type, date and timning or not
declare @MovieID int;
Select @MovieID = MovieID from Movie
where @Moviename = Title;

if not exists(Select 1 from ShowTimings as S
              join Theater as T
              On S.TheaterID = T.TheaterID
              where @MovieID = S.MovieID and @ScreenType = T.ScreenType
              and @ShowDate = S.ShowDate and @MovieTiming = S.ShowTiming)
BEGIN
print('Booking failed as Given Movie is not being displayed at Your Given details');
Return;
end

--Now Check if seat is availaible in given ScreenType(Theater) for that movie
declare @TheaterID int;
declare @ShowTimeID int;

Select @TheaterID = T.TheaterID,@ShowTimeID = S.ShowTimeID from ShowTimings as S
join Theater as T
On S.TheaterID = T.TheaterID
where @MovieID = S.MovieID and @ScreenType = T.ScreenType
and @ShowDate = S.ShowDate and @MovieTiming = S.ShowTiming;

if not exists(Select 1 from Theater as T
              join SeatRecord as S
              On T.SeatRecordID = S.SeatRecordID
              where @TheaterID = T.TheaterID
              and S.AvailableSeats>0)
BEGIN
print('Booking Failed as Given ScreenType has no seat availaible');
RETURN;
end

--Now all checks all clear and now insert in tables
--First insert in seat
INSERT into Seat(TheaterID,RowNumber)
values (@TheaterID,@Rownumber);

declare @Seatnumber int;
set @Seatnumber = SCOPE_IDENTITY();

--Now update SeatRecord for that theater
Update SeatRecord
set AvailableSeats = AvailableSeats - 1, 
    OccupiedSeats = OccupiedSeats + 1
where SeatRecordID = (Select SeatRecordID from Theater
                      where @TheaterID = TheaterID);

--Now Finally Insert into Booking Table
Insert into Bookings (UserID,SeatNumber,ShowTimeID)
values (@UserID,@Seatnumber,@ShowTimeID);

END
GO

exec UserBooking 1,'Batman vs Superman','Gold','2025-07-15','11:30:00',5;
SELECT * from Bookings;
SELECT * from Seat;
SELECT * from SeatRecord;

--(Note: In above procedure, I have not added seat number as input because it is for now
--       has an identity on it and I don't how to remove that Identity)

--10 Users can view Seats of a theater
GO
Create Procedure ViewSeats
@TheaterID int
as BEGIN

if exists(Select 1 from theater where TheaterID = @TheaterID)
BEGIN
Select * from Theater as T
join SeatRecord as S
On T.SeatRecordID = S.SeatRecordID
where T.TheaterID = @TheaterID;
END

ELSE
BEGIN
print('Theater not found');
END

END
GO

exec ViewSeats 1;

--11 Users can Browse Movies
GO
Create Procedure ViewMovies
as begin

Select M.Title,M.Genre,M.MovieType,M.Duration,R.IMDbRating,R.Review from Movie as M
join Rating as R
On M.RatingID = R.RatingID;

end
GO

exec ViewMovies;

--12 Users can View Show Timings and Theater
Go
Create procedure ViewShowTimings
as BEGIN

Select M.Title,T.ScreenType,S.ShowDate,S.ShowTiming,P.Amount,P.Category from ShowTimings as S
join Theater as T
On T.TheaterID = S.TheaterID
join Movie as M
On M.MovieID = S.MovieID
join Prices as P
On S.PriceID = P.PriceID;

END
Go

exec ViewShowTimings;

--13 Users can cancel their Booking
Go
Create PROCEDURE CancelBooking
@UserID int,
@BookingID int
as BEGIN

if exists (Select 1 from Bookings where UserID = @UserID and BookingID = @BookingID)
BEGIN
Delete from Bookings
where UserID = @UserID and BookingID = @BookingID;
END

ELSE
BEGIN
print('Cancelation failed as Record not found');
END

END
GO

exec CancelBooking 2,2;