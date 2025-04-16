Use Master
go

create database MovieMate
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
MovieType varchar(20),      --e.g. HollyWood,BollyWood,Punjabi
Genre varchar(20),
Duration Time,
RatingID int,                --FK
Foreign Key (RatingID) references Rating(RatingID)
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
Foreign Key (SeatRecordID) references SeatRecord(SeatRecordID)
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
UserID int Identity(1,1) Primary Key,	--auto-incrementor
UserName nvarchar(30) COLLATE Latin1_General_CS_AS UNIQUE NOT NULL,
Email nvarchar(30) COLLATE Latin1_General_CS_AS UNIQUE NOT NULL,
UserPassword nvarchar(255) COLLATE Latin1_General_CS_AS NOT NULL,	--making data case and accent sensititve
UserType varchar(30)         --e.g. Customer,Admin,Employee
);

Create Table Payment(
PaymentID int Primary Key,
PaymentStatus varchar(20),         --Paid or UnPaid
PaymentMethod varchar(20),         --Bank or Cash
payementType varchar(20) NULL,	   --Digital Wallet, credit card, or debit card
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


go
Create Procedure Signup	--creating a new account
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

create procedure loginE	--login using email
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
				select U.UserID, U.UserName, U.Email, U.UserType, B.BookingID, B.SeatNumber, B.ShowTimeID
				from Users AS U
				join Bookings AS B on U.UserID = B.UserID
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

create procedure loginU	--login using Username
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
				select U.UserID, U.UserName, U.Email, U.UserType, B.BookingID, B.SeatNumber, B.ShowTimeID
				from Users AS U
				join Bookings AS B on U.UserID = B.UserID
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

alter procedure updatePass
@email nvarchar(30),@oldPass nvarchar(255), @newPass nvarchar(255),
@flag int OUTPUT

As Begin

if @oldPass = @newPass
	begin
		set @flag = 2; --password is the same
		return;
	end
else
	begin
		if Exists (Select 1 From Users where Email = @email and UserPassword = @oldPass)
			begin
				Update Users
				Set UserPassword = @newPass
				where @email = Email;
				Set @flag = 0;	--password is successfully changed
			end
		else
			begin
				Set @flag = 1; --Password does not match
			end
	end
end
go

create procedure [browse]	--display all available movies
As Begin

Select M.Title, M.MovieType, M.Genre, M.Duration, M.RatingID from Movie As M	--all the necessary movie details relevent to the user 
Order By M.title;	--Order them in ascending order

end
go

create procedure searchMovie	--Search a movie that is similar to that title
@movieName nvarchar(255)
As Begin

Select M.Title, M.MovieType, M.Genre, M.Duration, M.RatingID from Movie As M
where M.Title COLLATE Latin1_General_CI_AI Like '%' + @movieName + '%';	--in case some part of the name is known and not the full name

end
go

create procedure screeningDetails --all movie screening Details
As Begin

Select M.Title, M.MovieType, M.Genre, M.Duration, M.RatingID, ST.ShowTiming, T.TheaterID, T.ScreenType from Movie As M
join ShowTimings As ST on M.MovieID = ST.MovieID
join Theater As T on ST.TheaterID = T.TheaterID
Order By ST.ShowTiming; --earliest screening

end
go

create procedure SscreeningDetails --movie screening Details of the required movie
@movieName nvarchar(255)

As Begin

Select M.Title, M.MovieType, M.Genre, M.Duration, M.RatingID, ST.ShowTiming, T.TheaterID, T.ScreenType from Movie As M
join ShowTimings As ST on M.MovieID = ST.MovieID
join Theater As T on ST.TheaterID = T.TheaterID
where M.Title COLLATE Latin1_General_CI_AI Like '%' + @movieName + '%'	--allow partial matches
Order By ST.ShowTiming;

end
go

create procedure PayementStatusUpdate	--confirms a payement
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
