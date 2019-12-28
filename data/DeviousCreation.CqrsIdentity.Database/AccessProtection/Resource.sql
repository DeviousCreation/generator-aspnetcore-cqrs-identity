CREATE TABLE [AccessProtection].[Resource]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(100) NOT NULL, 
    [NormalizedName] NVARCHAR(250) NOT NULL, 
    [ParentResourceId] UNIQUEIDENTIFIER NULL
)
