CREATE VIEW [Odata].[vwUser]
AS
SELECT 
		u.Id
	,	u.EmailAddress
	,	u.Username
	,	Cast(Case when u.WhenVerified is null then 0 else 1 end as bit) as IsVerified
	,	Cast(Case when u.WhenLocked is null then 0 else 1 end as bit) as IsLocked
	,	u.IsLockable
	,	u.WhenSignedIn
	,	u.WhenCreated
	,	p.FirstName
	,	p.LastName
FROM [Identity].[User] u
LEFT JOIN [Identity].Profile p
	ON u.Id = p.UserId
