/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

MERGE INTO [AccessProtection].[Resource] AS Target
USING (VALUES
  ('5424fc1b-c4aa-46d1-9c58-c22d55df6b4e', N'Users', 'users', null),
  ('d4b70a73-6065-451b-85b4-54f5f544c3e5', N'View User', 'user-view', '5424fc1b-c4aa-46d1-9c58-c22d55df6b4e'),
  ('e457df69-7e2f-437a-84b8-2b5b0678cef7', N'Edit User', 'user-edit', '5424fc1b-c4aa-46d1-9c58-c22d55df6b4e'),
  ('0407e48b-f454-4af6-9874-7927e3cbeb7f', N'Create User', 'user-create', '5424fc1b-c4aa-46d1-9c58-c22d55df6b4e'),
  ('a96ae244-136d-4aba-a4d8-02a72f9a6ead', N'Delete User', 'user-delete', '5424fc1b-c4aa-46d1-9c58-c22d55df6b4e')
 )
AS Source (Id, Name, NormalizedName, ParentResourceId)
ON Target.Id = Source.Id
-- update matched rows
WHEN MATCHED THEN
UPDATE SET 
        Name = Source.Name
    ,   NormalizedName = Source.NormalizedName
    ,   ParentResourceId = Source.ParentResourceId
--insert new rows
WHEN NOT MATCHED BY TARGET THEN
INSERT (Id, Name, NormalizedName, ParentResourceId)
VALUES (Id, Name, NormalizedName, ParentResourceId)
-- delete rows that are in the target but not the source
WHEN NOT MATCHED BY SOURCE THEN
DELETE;