CREATE VIEW [OData].[vwRole]
AS
SELECT 
		r.Name
	,	r.Id
	,	COUNT(r.id) as ResourceCount
FROM [AccessProtection].[Role] r
LEFT JOIN  [AccessProtection].[RoleResource] rR
    ON r.Id = rR.RoleId
GROUP BY 
		r.Id
	,	r.Name
