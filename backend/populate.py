from flask_sqlalchemy import SQLAlchemy

from Database import *
from server import db

import datetime

import random

db.session.query(Account).delete()
db.session.query(Department).delete()
db.session.query(DepartmentMember).delete()
db.session.query(Incident).delete()
# db.session.query(IncidentUpdate).delete()
db.session.query(Unit).delete()
db.session.query(Message).delete()
db.session.query(Note).delete()

#techs
account1 = Account(username = 'mud', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Ianis', lastName = 'Smith')
account2 = Account(username = 'vote', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Alaw', lastName = 'Ward')
account3 = Account(username = 'leak', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Nikola', lastName = 'Howard')
account4 = Account(username = 'corner', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Thierry', lastName = 'Carter')
account5 = Account(username = 'aspect', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Maximillian', lastName = 'Brookes')
account6 = Account(username = 'pour', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Meadow', lastName = 'Mills')
account7 = Account(username = 'brilliance', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Maggie', lastName = 'Petty')
account8 = Account(username = 'greet', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Alaina', lastName = 'Maxwell')
account9 = Account(username = 'relax', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Oliwia', lastName = 'Whitehouse')
account10 = Account(username = 'tent', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Kendrick', lastName = 'Ortiz')
account11 = Account(username = 'evoke', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Leslie', lastName = 'Mackenzie')
account12 = Account(username = 'put', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Dawson', lastName = 'Ireland')

#que managers
account13 = Account(username = 'cute', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Damian', lastName = 'Wright')
account14 = Account(username = 'check', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Safa', lastName = 'Hunter')
#major incident manager
account15 = Account(username = 'autonomy', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Kairo', lastName = 'Nichols')

#resolvers
account16 = Account(username = 'text', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Aisha', lastName = 'Devine')
account17 = Account(username = 'conglomerate', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Oran', lastName = 'Chapman')
account18 = Account(username = 'reception', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Rachelle', lastName = 'Combs')
account19 = Account(username = 'artist', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Sienna-Rose', lastName = 'Luna')

#service desk
account20 = Account(username = 'directory', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Aaron', lastName = 'Bains')
account21 = Account(username = 'prince', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Alasdair', lastName = 'Holmes')

#normal user
account22 = Account(username = 'user', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'John', lastName = 'Marston')
account23 = Account(username = 'user2', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Arthur', lastName = 'Morgan')
account24 = Account(username = 'user3', password = '5f4dcc3b5aa765d61d8327deb882cf99', firstName = 'Micah', lastName = 'Bell')

department1 = Department(departmentID = 1, name = 'Technicians 1')
department2 = Department(departmentID = 2, name = 'Technicians 2')
department3 = Department(departmentID = 3, name = 'Technicians 3')
department4 = Department(departmentID = 4, name = 'Technicians 4')
department5 = Department(departmentID = 5, name = 'Managers')
department6 = Department(departmentID = 6, name = 'Resolvers')
department7 = Department(departmentID = 7, name = 'Service Desk')
department8 = Department(departmentID = 8, name = 'Finance')
department9 = Department(departmentID = 9, name = 'Communications')

departmentMember1 = DepartmentMember(username = 'mud', departmentID = 1, role = 'Technician')
departmentMember2 = DepartmentMember(username = 'vote', departmentID = 1, role = 'Technician')
departmentMember3 = DepartmentMember(username = 'leak', departmentID = 1, role = 'Technician')
departmentMember4 = DepartmentMember(username = 'corner', departmentID = 2, role = 'Technician')
departmentMember5 = DepartmentMember(username = 'aspect', departmentID = 2, role = 'Technician')
departmentMember6 = DepartmentMember(username = 'pour', departmentID = 2, role = 'Technician')
departmentMember7 = DepartmentMember(username = 'brilliance', departmentID = 3, role = 'Technician')
departmentMember8 = DepartmentMember(username = 'greet', departmentID = 3, role = 'Technician')
departmentMember9 = DepartmentMember(username = 'relax', departmentID = 3, role = 'Technician')
departmentMember10 = DepartmentMember(username = 'tent', departmentID = 4, role = 'Technician')
departmentMember11 = DepartmentMember(username = 'evoke', departmentID = 4, role = 'Technician')
departmentMember12 = DepartmentMember(username = 'put', departmentID = 4, role = 'Technician')
departmentMember13 = DepartmentMember(username = 'cute', departmentID = 5, role = 'Que Manager')
departmentMember14 = DepartmentMember(username = 'check', departmentID = 5, role = 'Que Manager')
departmentMember15 = DepartmentMember(username = 'autonomy', departmentID = 5, role = 'Major Incident Manager')
departmentMember16 = DepartmentMember(username = 'text', departmentID = 6, role = 'Resolver')
departmentMember17 = DepartmentMember(username = 'conglomerate', departmentID = 6, role = 'Resolver')
departmentMember18 = DepartmentMember(username = 'reception', departmentID = 6, role = 'Resolver')
departmentMember19 = DepartmentMember(username = 'artist', departmentID = 6, role = 'Resolver')
departmentMember20 = DepartmentMember(username = 'directory', departmentID = 7, role = 'Service Desk')
departmentMember21 = DepartmentMember(username = 'prince', departmentID = 7, role = 'Service Desk')
departmentMember22 = DepartmentMember(username = 'user', departmentID = 8, role = 'Accountant')
departmentMember23 = DepartmentMember(username = 'user2', departmentID = 8, role = 'Accountant')
departmentMember24 = DepartmentMember(username = 'user3', departmentID = 9, role = 'Manager')

incident1 = Incident(incidentID = 1, raisedID = 'directory', affectedID = 'user', investigatingDepartmentID = 1, description = 'Something broke', timeRaised = datetime.datetime(2019,2,15,7,5), priority = 'P2', severity = 'S1', impact = 'impact', status = 'completed', timeCompleted = datetime.datetime(2019,3,4,6,4))
incident2 = Incident(incidentID = 2, raisedID = 'user', affectedID = 'user', investigatingDepartmentID = 1, description = 'Something broke', timeRaised = datetime.datetime(2019,2,20,9,50), priority = 'P1', severity = 'S1', impact = 'impact', status = 'completed', timeCompleted = datetime.datetime(2019,3,15,8,5))
incident3 = Incident(incidentID = 3, raisedID = 'prince', affectedID = 'user2', investigatingDepartmentID = 2, description = 'Something broke', timeRaised = datetime.datetime(2019,3,4,10,45), priority = 'P3', severity = 'S2', impact = 'impact', status = 'completed', timeCompleted = datetime.datetime(2019,5,15,7,5))
incident4 = Incident(incidentID = 4, raisedID = 'directory', affectedID = 'user3', investigatingDepartmentID = 2, description = 'Something broke', timeRaised = datetime.datetime(2019,3,30,13,50), priority = 'P3', severity = 'S3', impact = 'impact', status = 'completed', timeCompleted = datetime.datetime(2019,4,15,7,5))
incident5 = Incident(incidentID = 5, raisedID = 'prince', affectedID = 'user2', investigatingDepartmentID = 3, description = 'Something broke', timeRaised = datetime.datetime(2019,4,15,16,25), priority = 'P3', severity = 'S3', impact = 'impact', status = 'assigned', timeCompleted = None)
incident6 = Incident(incidentID = 6, raisedID = 'prince', affectedID = 'user', investigatingDepartmentID = 3, description = 'Something broke', timeRaised = datetime.datetime(2019,4,16,7,5), priority = 'P1', severity = 'S2', impact = 'impact', status = 'assigned', timeCompleted = None)
incident7 = Incident(incidentID = 7, raisedID = 'autonomy', affectedID = 'autonomy', investigatingDepartmentID = 4, description = 'Something broke', timeRaised = datetime.datetime(2019,5,18,10,30), priority = 'P2', severity = 'S1', impact = 'impact', status = 'assigned', timeCompleted = None)
incident8 = Incident(incidentID = 8, raisedID = 'mud', affectedID = 'mud', investigatingDepartmentID = 4, description = 'Something broke', timeRaised = datetime.datetime(2019,6,6,6,36), priority = 'P2', severity = 'S1', impact = 'impact', status = 'assigned', timeCompleted = None)
incident9 = Incident(incidentID = 9, raisedID = 'pour', affectedID = 'pour', investigatingDepartmentID = None, description = 'Something broke', timeRaised = datetime.datetime(2019,7,20,6,4), priority = 'P2', severity = 'S3', impact = 'impact', status = 'submited', timeCompleted = None)
incident10 = Incident(incidentID = 10, raisedID = 'tent', affectedID = 'tent', investigatingDepartmentID = None, description = 'Something broke', timeRaised = datetime.datetime(2019,9,2,7,50), priority = 'P3', severity = 'S3', impact = 'impact', status = 'submited', timeCompleted = None)

# incidentUpdate1 = IncidentUpdate(updateID = 1, technicianID = 'mud', incidentID = 1, date = datetime.datetime(2019,2,15,14,5), description = 'We fixed something')
# incidentUpdate2 = IncidentUpdate(updateID = 2, technicianID = 'vote', incidentID = 2, date = datetime.datetime(2019,2,20,15,3), description = 'We fixed something')
# incidentUpdate3 = IncidentUpdate(updateID = 3, technicianID = 'leak', incidentID = 3, date = datetime.datetime(2019,3,5,14,5), description = 'We fixed something')
# incidentUpdate4 = IncidentUpdate(updateID = 4, technicianID = 'corner', incidentID = 4, date = datetime.datetime(2019,4,30,7,5), description = 'We fixed something')
# incidentUpdate5 = IncidentUpdate(updateID = 5, technicianID = 'aspect', incidentID = 5, date = datetime.datetime(2019,5,30,14,5), description = 'We fixed something')
# incidentUpdate6 = IncidentUpdate(updateID = 6, technicianID = 'pour', incidentID = 6, date = datetime.datetime(2019,6,15,14,5), description = 'We fixed something')
# incidentUpdate7 = IncidentUpdate(updateID = 7, technicianID = 'greet', incidentID = 7, date = datetime.datetime(2019,9,15,14,5), description = 'We fixed something')
# incidentUpdate8 = IncidentUpdate(updateID = 8, technicianID = 'Tent', incidentID = 8, date = datetime.datetime(2019,10,15,14,5), description = 'We fixed something')

db.session.add(account1)
db.session.add(account2)
db.session.add(account3)
db.session.add(account4)
db.session.add(account5)
db.session.add(account6)
db.session.add(account7)
db.session.add(account8)
db.session.add(account9)
db.session.add(account10)
db.session.add(account11)
db.session.add(account12)
db.session.add(account13)
db.session.add(account14)
db.session.add(account15)
db.session.add(account16)
db.session.add(account17)
db.session.add(account18)
db.session.add(account19)
db.session.add(account20)
db.session.add(account21)
db.session.add(account22)
db.session.add(account23)
db.session.add(account24)

db.session.add(department1)
db.session.add(department2)
db.session.add(department3)
db.session.add(department4)
db.session.add(department5)
db.session.add(department6)
db.session.add(department7)
db.session.add(department8)
db.session.add(department9)

db.session.add(departmentMember1)
db.session.add(departmentMember2)
db.session.add(departmentMember3)
db.session.add(departmentMember4)
db.session.add(departmentMember5)
db.session.add(departmentMember6)
db.session.add(departmentMember7)
db.session.add(departmentMember8)
db.session.add(departmentMember9)
db.session.add(departmentMember10)
db.session.add(departmentMember11)
db.session.add(departmentMember12)
db.session.add(departmentMember13)
db.session.add(departmentMember14)
db.session.add(departmentMember15)
db.session.add(departmentMember16)
db.session.add(departmentMember17)
db.session.add(departmentMember18)
db.session.add(departmentMember19)
db.session.add(departmentMember20)
db.session.add(departmentMember21)
db.session.add(departmentMember22)
db.session.add(departmentMember23)
db.session.add(departmentMember24)

db.session.add(incident1)
db.session.add(incident2)
db.session.add(incident3)
db.session.add(incident4)
db.session.add(incident5)
db.session.add(incident6)
db.session.add(incident7)
db.session.add(incident8)
db.session.add(incident9)
db.session.add(incident10)

# db.session.add(incidentUpdate1)
# db.session.add(incidentUpdate2)
# db.session.add(incidentUpdate3)
# db.session.add(incidentUpdate4)
# db.session.add(incidentUpdate5)
# db.session.add(incidentUpdate6)
# db.session.add(incidentUpdate7)
# db.session.add(incidentUpdate8)


for i in range(0, 15):
    db.session.add(Unit(unitID=(i+1), departmentID=random.randint(1, 9), unitname=("unit" + str(random.randint(1, 5)))))


for i in range(0, 15):
    db.session.add(Message(messageID=(i+1), messageText=(str(random.randint(10000,900000))), senderID=random.randint(1, 24), receiverID=random.randint(1, 24), date=datetime.datetime(2019,10,15,14,5)))

for i in range(0, 15):
    db.session.add(Note(noteID=(i+1), incidentID=random.randint(1, 10), author="test", text=(str(random.randint(10000,900000))), date=datetime.datetime(2019,10,15,14,5)))


accounts = ["test", "testsd", "testmim"]
departments = [1, 7, 5]
roles = ["End user", "Service Desk", "Major Incident Manager"]
for i in range(0, len(accounts)):
    db.session.add(Account(username=accounts[i], password='098f6bcd4621d373cade4e832627b4f6', firstName=accounts[i], lastName=accounts[i]))
    db.session.add(DepartmentMember(username=accounts[i], departmentID=departments[i], role=roles[i]))

db.session.commit()