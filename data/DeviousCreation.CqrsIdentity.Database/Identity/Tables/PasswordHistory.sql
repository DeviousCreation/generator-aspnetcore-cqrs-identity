﻿CREATE TABLE [Identity].[PasswordHistory]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [UserId] UNIQUEIDENTIFIER NOT NULL, 
    [PasswordHash] VARCHAR(100) NOT NULL, 
    [WhenUsed] DATETIME2 NOT NULL
)
