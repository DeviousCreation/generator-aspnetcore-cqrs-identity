CREATE TABLE [Identity].[UserRole]
(
	[UserId] UNIQUEIDENTIFIER NOT NULL , 
    [RoleId] UNIQUEIDENTIFIER NOT NULL, 
    PRIMARY KEY ([UserId], [RoleId])
)
