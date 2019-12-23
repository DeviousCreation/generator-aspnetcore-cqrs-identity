CREATE TABLE [Identity].[User]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [EmailAddress] NVARCHAR(320) NOT NULL, 
    [Username] NVARCHAR(320) NOT NULL, 
    [PasswordHash] VARCHAR(100) NOT NULL, 
    [WhenVerified] DATETIME2 NULL, 
    [WhenPasswordChanged] DATETIME2 NULL, 
    [IsLockable] BIT NOT NULL, 
    [SignInAttempts] INT NOT NULL, 
    [WhenLocked] DATETIME2 NULL, 
    [WhenCreated] DATETIME2 NOT NULL, 
    [WhenSignedIn] DATETIME2 NULL, 
    [SecurityStamp] UNIQUEIDENTIFIER NOT NULL, 
    [MobileNumber] VARCHAR(50) NULL 
)
