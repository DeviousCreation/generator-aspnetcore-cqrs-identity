CREATE TABLE [AccessProtection].[RoleResource]
(
	[RoleId] UNIQUEIDENTIFIER NOT NULL , 
    [ResourceId] UNIQUEIDENTIFIER NOT NULL, 
    PRIMARY KEY ([RoleId], [ResourceId])
)
