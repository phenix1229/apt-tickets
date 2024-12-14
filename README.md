This system was created as an independent study project at Empire State University. It is an online work ticket system for a theoritical apartment building. The system has slightly different features based on user classification (resident, staff member, administrator). The system has the following overall features:

*	Ticket creation
*	Ticket viewing
*	Ticket updates (including closure)
*	Ticket assignment (automated)
*	Alerts for creation, assignment, updates, closure (automated)
*	Ticket search by various fields
*	Account creation
*	Authentication

An example of a resident use case:

*	Resident creates an account and is logged into the system
*	An alert email is sent to confirm account creation
*	Resident creates a work ticket for a specific issue
*	The ticket is automatically assigned to a department who is qualified to resolve the issue
*	An alert email is sent to confirm ticket creation
*	Resident can log into the system to see status/updates or close ticket if help is no longer needed
*	Resident can also look up their past tickets

An example of a staff member use case:

*	Staff member logs into system
*	Staff member views tickets assigned to their department
*	Staff member opens a specific ticket and enters an update (including closure)
*	Resident automatically receives an alert email stating the update/new status of ticket
*	Staff member can also look up past tickets for their department

An example of an administrator use case:

*	Administrator logs in
*	Administrator creates an account for a new staff member (or resident, though residents can self-register)
*	Administrator can view and edit all accounts for former staff members or residents
*	Administrator can also look up all current and past tickets, as well as open and update tickets

The system will operate as follows:

*	User either logs in or creates account (only authorized users may access system)
*	Backend server determines user classification and determines appropriate options/page which is presented on the front end to the user
*	Upon any ticket or account action backend will send an alert email to the appropriate party
*	Any ticket updates (including creation and closure) will be timestamped and marked with the name of the party who made the update
*	Backend will save to and retrieve all data from database
*	Users will only have access to data appropriate to their classification
*	Residents will only have access to their own tickets
*	Staff members will only have access to tickets assigned to their department
*	Only administrator(s) shall have access to all data and permission/ability to perform actions on user accounts (other than resident's ability to create their own accounts)
*	Users will only have permissions appropriate to their classification
*	Residents may only create their own accounts, create tickets for themselves, view/search/close their own tickets
*	Staff members may only view/search/close tickets for their department
*	Administrator(s) may perform all actions

