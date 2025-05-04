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
SeatNumber char(2),   --e.g: A1,B2
TheaterID int,                    --FK
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
SeatNumber int,               --FK and its updated data-type is char(2)
ShowTimeID int,               --FK
PaymentID int,                --FK
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
Alter table Seat
Add Constraint fk_Seat1
Foreign Key(TheaterID) references Theater(TheaterID) On delete cascade On Update cascade;

Alter table ShowTimings
add CONSTRAINT Show_1
Foreign Key(MovieID) references Movie(MovieID) On delete cascade On update cascade;

Alter table ShowTimings
add CONSTRAINT Show_2
Foreign Key(TheaterID) references Theater(TheaterID) On delete cascade On update cascade;

Alter table ShowTimings
add CONSTRAINT Show_3
Foreign Key(PriceID) references Prices(PriceID) On delete cascade On update cascade;

Alter table Bookings
add constraint Book_1
Foreign Key (ShowTimeID) references ShowTimings(ShowTimeID) On Delete cascade On Update cascade;

Alter table Bookings
add constraint Book_2
Foreign Key (UserID) references Users(UserID) On Delete cascade On Update cascade;

Alter table Bookings
add constraint Book_3
Foreign Key (PaymentID) references Payment(PaymentID) On Delete cascade On Update cascade;

Alter table Bookings
add TheaterID int;

Alter table Bookings
add constraint Book_4
Foreign Key (SeatNumber, TheaterID) references Seat(SeatNumber, TheaterID) On Delete No Action;

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

Alter Table Bookings
Alter Column Seatnumber char(2);

Alter Table Bookings
Add constraint fk_bookings_SeatNumber
Foreign Key (SeatNumber, TheaterID) references Seat(SeatNumber, TheaterID);

Alter table Users
alter column UserName nvarchar(30) COLLATE Latin1_General_CS_AS NOT NULL;

Alter table Users
add constraint un_1
Unique(UserName);

Alter table Users
alter column Email nvarchar(30) COLLATE Latin1_General_CS_AS NOT NULL;

Alter table Users
add constraint un_2
Unique(Email);

Alter table Users
alter column UserPassword nvarchar(255) COLLATE Latin1_General_CS_AS NOT NULL;

ALTER TABLE Seat
ALTER COLUMN TheaterID INT NOT NULL;

ALTER TABLE Seat
ALTER COLUMN SeatNumber char(3);

Alter Table Bookings
Alter Column SeatNumber char(3);

Alter TABLE Seat
add constraint seat_PK
primary key(SeatNumber, TheaterID); 



Alter table Movie add links varchar(MAX);
Alter table Movie add trailer varchar(MAX);
Alter table Seat add available int;

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
@MovieID int,
@MovieName varchar(30)
as begin

if exists (Select 1 from Movie where MovieID = @MovieID)
begin
Delete from Movie
where MovieID = @MovieID;
print('Movie Removed Successfully');
end

else
begin
print('Movie does not exist');
end

end
GO

exec RemoveMovie 6,'SpiderMan';
Select * from Movie;

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
set @Amount = @Amount - (@Amount * (20.0/100));
END

else if (@Category = 'Children')
BEGIN
set @Amount = @Amount - (@Amount * (10.0/100));
END

else if (@Category = 'Old')
BEGIN
set @Amount = @Amount - (@Amount * (15.0/100));
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

exec AddShowPrice 'Student',500,4;
Select * from Prices;
Select * from ShowTimings;

--9 Admin can take Movie or Show related details from user to book him a show
GO
Alter Procedure UserBooking
@UserID int,
@Moviename varchar(30),
@ScreenType varchar(20),
@ShowDate Date,
@MovieTiming time,
@SeatNumber char(2)
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

Update Seat
set Seat.available = 0
where TheaterID = @TheaterID And SeatNumber = @SeatNumber; 

--Now update SeatRecord for that theater
Update SeatRecord
set AvailableSeats = AvailableSeats - 1, 
    OccupiedSeats = OccupiedSeats + 1
where SeatRecordID = (Select SeatRecordID from Theater
                      where @TheaterID = TheaterID);

--Now Finally Insert into Booking Table
Insert into Bookings (UserID,SeatNumber, TheaterID, ShowTimeID)
values (@UserID,@Seatnumber,@TheaterID, @ShowTimeID);

END
GO

exec UserBooking 1,'Batman vs Superman','Gold','2025-07-15','11:30:00','A5';
SELECT * from Bookings;
SELECT * from Seat;
SELECT * from SeatRecord;

--9.5 After Booking User has to Do Payment
GO
Create Procedure PerformPayment
@BookingID int,
@PaymentMethod varchar(20),
@UserAmount float
as begin

if not exists(Select 1 from Bookings where BookingID = @BookingID)
begin
print('Payment Failed! As Booking-ID not found');
Return;
end

if exists (Select 1 from Bookings where BookingID = @BookingID and PaymentID is not NULL)
begin
print('Payment Failed! As Payment has already made on this Booking-ID');
Return;
end

--Now Check if Given Amount = ShowAmount
declare @ShowAmount float;
Select @ShowAmount = P.Amount from Bookings as B
join ShowTimings as S
On B.ShowTimeID = S.ShowTimeID
join Prices as P
On S.PriceID = P.PriceID
where B.BookingID = @BookingID;

declare @Current_time time;
Set @Current_time = Convert(time,GETDATE());

if (@UserAmount < @ShowAmount)
begin
Insert into Payment(PaymentStatus,PaymentMethod,PaymentTime)
values ('Unpaid',@PaymentMethod,@Current_time);
print('Given Amount is less than ShowPrice');
end

else
begin
Insert into Payment(PaymentStatus,PaymentMethod,PaymentTime)
values ('Paid',@PaymentMethod,@Current_time);
print('Payment Successful!');
end

--Now Update Payemnt ID in Booking Table
declare @PaymentID int;
set @PaymentID = SCOPE_IDENTITY();

Update Bookings
set PaymentID = @PaymentID
where BookingID = @BookingID;

--Return balance if any to user
if (@UserAmount > @ShowAmount)
begin
print('The return amount of user is: ' + Cast(@UserAmount - @ShowAmount as varchar));
end

end
GO

exec PerformPayment 2,'Online',1000;
Select * from Payment;
Select * from Bookings;

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

exec ViewSeats 2;

--11 Admin can View Movies Record
GO
Create Procedure ViewMovies
as begin

Select M.MovieID,M.Title,M.Genre,M.MovieType,M.Duration,R.IMDbRating,R.Review from Movie as M
left join Rating as R
On M.RatingID = R.RatingID;

end
GO

exec ViewMovies;

--12 Admin can View Show Timings and Theater
Go
Create procedure ViewShowTimings
as BEGIN

Select S.ShowTimeID,M.MovieID,T.TheaterID,S.ShowDate,S.ShowTiming,P.Amount,P.Category from ShowTimings as S
left join Theater as T
On T.TheaterID = S.TheaterID
left join Movie as M
On M.MovieID = S.MovieID
left join Prices as P
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

--14 Admin can view Theaters and their SeatRecord
Go
Create Procedure ShowTheaters
as begin

Select T.TheaterID,T.ScreenType,S.SeatRecordID,S.TotalSeats,S.AvailableSeats,S.OccupiedSeats from Theater as T
left join SeatRecord as S
On T.SeatRecordID = S.SeatRecordID;

end
Go

exec ShowTheaters;

--14.1 Admin can view Booking Record
Go
Create Procedure ShowBookings
as begin

Select B.BookingID,U.UserName,B.SeatNumber,B.ShowTimeID,P.PaymentMethod,P.PaymentStatus from Bookings as B
left join Users as U
On B.UserID = U.UserID
left join Seat as S
On B.SeatNumber = S.SeatNumber
left join ShowTimings as Sh
On B.ShowTimeID = Sh.ShowTimeID
left join Payment as P
On B.PaymentID = P.PaymentID;

END
GO

exec ShowBookings;

--14.2 Admin can view User Record
Go
Create Procedure ShowUsers
as BEGIN

Select U.UserID,U.UserName,U.UserPassword,U.UserType,UR.MovieID,UR.Review from Users as U
left join UserReview as UR
On U.UserID = UR.UserID;

END
GO

exec ShowUsers;

---Abdullah Ejaz Combining---
--15 Creating a new account
go
Create Procedure Signup
@Username nvarchar(30), @email nvarchar(30),
@password nvarchar(255), @UserType varchar(30), 
@flag int OUTPUT

As Begin
if exists(select 1 from Users where Email = @email)
	begin
		set @flag = 1 --Email already exists
		return;
	end
else if @UserType NOT IN('Customer','Admin','Employee')
	begin
		set @flag = 3 --userType is incorrect
		return;
	end
else if exists(select 1 from Users where UserName = @Username) OR (@Username is NULL)
	begin
		set @flag = 2 --UserName already exists
		return;
	end
else 
	begin
		insert into Users(UserName,Email,UserPassword,UserType)
		values(@Username, @email, @password, @UserType);
		set @flag = 0
	end
end
go

declare @flag int;
exec Signup 'hamza','hamza123@gmail.com','hamzastation','Admin',@flag output;
SELECT * from Users;

--16 Login using Email
Go
Create procedure loginE
@email nvarchar(30), @password nvarchar(255), @flag int OUTPUT

As Begin
if NOT Exists(select 1 from Users where @email = Email)
	begin
		set @flag = 1 --Email does not exist
		return;
	end
else
	begin
		if @password = (select UserPassword from Users where @email = Email)
			begin
				set @flag = 0 --login is successful
				select U.UserID, U.UserName, U.Email, U.UserType
				from Users AS U
				where U.Email = @email;
			end
		else
			begin
				set @flag = 1 --password is incorrect
				return;
			end
	end
end
go

declare @flag int;
exec loginE 'bhati123@gmail.com','playstation',@flag output;
Select @flag as Status;

--17 login using Username
Go
Create procedure loginU
@Username nvarchar(30), @password nvarchar(255), @flag int OUTPUT

As Begin
if NOT Exists(select 1 from Users where @Username = UserName)
	begin
		set @flag = 1 --username does not exist
		return;
	end
else
	begin
		if @password = (select UserPassword from Users where @Username = UserName)
			begin
				set @flag = 0 --login is successful
				select U.UserID, U.UserName, U.Email, U.UserType
				from Users AS U
				where U.UserName = @Username;
			end
		else
			begin
				set @flag = 1 --password is incorrect
				return;
			end
	end
end
go

declare @flag int;
exec loginU 'Bhatti','playstation',@flag output;
Select @flag as Status;
go

--18 Update Password
Go
create procedure updatePass
@UserName nvarchar(30),@oldPass nvarchar(255), @newPass nvarchar(255),
@flag int OUTPUT

As Begin

if @oldPass = @newPass
	begin
		set @flag = 2 --password is the same
		return;
	end
else
	begin
		if Exists (Select 1 From Users where UserName = @UserName and UserPassword = @oldPass)
			begin
				Update Users
				Set UserPassword = @newPass
				where @UserName = UserName;
				Set @flag = 0	--password is successfully changed
			end
		else
			begin
				Set @flag = 1 --Password does not match
				return;
			end
	end
end
go

declare @flag int;
exec updatePass 'Bhatti','playstation','playstation4',@flag output;
Select * from Users;

--19 Search a movie that is similar to that title
GO
alter procedure searchMovie
@movieName nvarchar(255)
As Begin

Select M.Title, M.MovieType, M.Genre, M.Duration, M.links, M.trailer, R.IMDbRating, R.Review from Movie As M
left join Rating as R On M.RatingID = R.RatingID
where M.Title COLLATE Latin1_General_CI_AI Like '%' + @movieName + '%'	--in case some part of the name is known and not the full name
ORDER By M.Title;

end
go

exec searchMovie 'Batman';

--20 all movie screening Details
Go
alter procedure screeningDetails
As Begin

Select DISTINCT M.Title, M.MovieType, M.Genre, M.Duration, M.links from Movie As M
join ShowTimings As ST on M.MovieID = ST.MovieID
join Theater As T on ST.TheaterID = T.TheaterID;

end
go

exec screeningDetails;

--21 movie screening Details of the required movie
Go
alter procedure SscreeningDetails
@movieName nvarchar(255)

As Begin

Select T.TheaterID, ST.ShowTimeID, M.Title, M.MovieType, M.Genre, M.Duration, M.RatingID, M.links, ST.ShowDate, ST.ShowTiming, T.ScreenType, P.Amount from Movie As M
join ShowTimings As ST on M.MovieID = ST.MovieID
join Theater As T on ST.TheaterID = T.TheaterID
left join Prices As P on ST.PriceID = P.PriceID
where M.Title COLLATE Latin1_General_CI_AI Like '%' + @movieName + '%'	--allow partial matches
order by ST.ShowDate, ST.ShowTiming;

end
go

exec SscreeningDetails 'A Working Man';

--22 confirms a payement
GO
create procedure PayementStatusUpdate
@bookingID int, @Status int --1 for confirm, 2 for pending
As Begin

if Exists(Select 1 from Bookings where BookingID = @bookingID)
	begin
		if @Status = 1
			begin
				update Payment
				set PaymentStatus = 'Paid'
				where Exists(Select 1 from Bookings As B
							join Payment As P on B.PaymentID = P.PaymentID);
			end
		else
			begin
			update Payment
				set PaymentStatus = 'UnPaid'
				where Exists(Select 1 from Bookings As B
							join Payment As P on B.PaymentID = P.PaymentID);
			end
end
end
go

declare @flag int;
exec PayementStatusUpdate 2,2;

Select *from Payment;

--23 Browse Movies
Go
alter procedure [browse]
As Begin

Select M.Title, M.MovieType, M.Genre, M.Duration, M.links, R.IMDbRating, R.Review  from Movie As M
left join Rating as R On M.RatingID = R.RatingID	--all the necessary movie details relevent to the user 
Order By M.title;	--Order them in ascending order

end
go

--24 Display Coming soon Movies
alter procedure comingSoon
As BEGIN

	Select M.Title, M.MovieType, M.Genre, M.Duration, M.links, R.IMDbRating, R.Review  from Movie As M
	left join Rating as R On M.RatingID = R.RatingID 

	EXCEPT

	Select M.Title, M.MovieType, M.Genre, M.Duration, M.links, R.IMDbRating, R.Review from Movie As M
	left join Rating as R on M.RatingID = R.RatingID
	join ShowTimings As ST on M.MovieID = ST.MovieID
	join Theater As T on ST.TheaterID = T.TheaterID
	Order By M.Title;

End

go

--25 Deletes all the ShowTiming which have passed
create procedure CleanupIfNeeded
As BEGIN
  Set Nocount On;

  Begin Tran;

  Declare @rc int;
  Exec @rc = sp_getapplock
    @Resource    = 'CleanupExpiredRows',
    @LockMode    = 'Exclusive',
    @LockOwner   = 'Transaction',
    @LockTimeout = 0;

  IF @rc >= 0
  begin
    Delete From ShowTimings
     Where  ShowDate < CAST(GetDate() As Date) or 
	 (ShowDate = CAST(GetDate() As Date) And ShowTiming <= CAST(GetDate() As Time));

    Exec sp_releaseapplock
      @Resource  = 'CleanupExpiredRows',
      @LockOwner = 'Transaction';
  End

  Commit Tran;
End
Go

exec CleanupIfNeeded;

--26 get seat record of a theater
go
ALter PROCEDURE getSeatRecord
@TheaterID int
as BEGIN

Select SeatNumber, available from Seat
where TheaterID = @TheaterID
Order by SeatNumber;

END
go

exec getSeatRecord 3;
SELECT * from Movie;

--27 Assign Seats

GO
ALTER PROCEDURE AssignSeats
    @TheaterID INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @row CHAR(1);
    DECLARE @num INT;
    DECLARE @seatNumber CHAR(3);
	DECLARE @available INT;

    SET @row = 'A';
	SET @available = 1;

    WHILE @row <= 'E'
    BEGIN
        SET @num = 0;

        WHILE @num < 10
        BEGIN
            -- Build SeatNumber (e.g., A1, A2, ..., E10)
            SET @seatNumber = @row + CAST(@num AS VARCHAR);

            INSERT INTO Seat (SeatNumber, TheaterID, available)
            VALUES (@seatNumber, @TheaterID, @available);

            SET @num = @num + 1;
        END

        SET @row = CHAR(ASCII(@row) + 1);
    END
END
GO

exec AssignSeats 3;
update Movie
set trailer = 'https://www.youtube.com/embed/NhWg7AQLI_8'
where MovieID = 1;

update Movie
set trailer = 'https://www.youtube.com/embed/vqu4z34wENw'
where MovieID = 2;

update Movie
set trailer = 'https://www.youtube.com/embed/uhlBqFj9kDw', MovieType = 'Anime'
where MovieID = 3;

update Movie
set trailer = 'https://www.youtube.com/embed/bKGxHflevuk'
where MovieID = 4;

update Movie
set trailer = 'https://www.youtube.com/embed/xEkVUPvYNUI'
where MovieID = 5;

update Movie
set trailer = 'https://www.youtube.com/embed/dx1AyG6-dnc'
where MovieID = 6;

update Movie
set trailer = 'https://www.youtube.com/embed/q8wthQkVfU0'
where MovieID = 7;

update Movie
set trailer = 'https://www.youtube.com/embed/hs3w32RG8L8'
where MovieID = 8;

update Movie
set trailer = 'https://www.youtube.com/embed/r-7g08INMSI'
where MovieID = 9;

update Movie
set trailer = 'https://www.youtube.com/embed/ysWq7nLVww4'
where MovieID = 10;

update Movie
set trailer = 'https://www.youtube.com/embed/PO4c5d6rNqw'
where MovieID = 11;

update Movie
set trailer = 'https://www.youtube.com/embed/9Js9joUIsAk'
where MovieID = 12;

Select * from ShowTimings;
select * from Movie;

Select* from Seat
where TheaterID = 1;

delete seat;