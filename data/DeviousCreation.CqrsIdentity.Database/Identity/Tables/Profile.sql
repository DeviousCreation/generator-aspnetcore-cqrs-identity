﻿CREATE TABLE [Identity].[Profile]
(
	[UserId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [FirstName] NVARCHAR(300) NULL, 
    [LastName] NVARCHAR(300) NULL
)
