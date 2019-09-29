CREATE TABLE [Identity].[SecurityTokenMapping]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [UserId] UNIQUEIDENTIFIER NOT NULL, 
    [Token] VARCHAR(650) NOT NULL, 
    [Purpose] NCHAR(10) NOT NULL, 
    [WhenCreated] DATETIME2 NOT NULL, 
    [WhenExpires] DATETIME2 NOT NULL, 
    [WhenUsed] DATETIME2 NULL
)
