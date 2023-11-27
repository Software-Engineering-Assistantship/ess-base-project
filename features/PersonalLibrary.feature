Feature: Personal Library
	As a user of Sistema de Reviews
	I want to create a personal library of classes
	So that I can organize and store my course's classes


Scenario: Successfuly adding a new folder
	Given I'm logged in as "Student" with username "Marcela" and password "1234"
	And I'm in the page "Minha Biblioteca"
	And there's no folder named "Cadeiras - 4o periodo"
	When I press the "Nova pasta" button
	And I type the name "Cadeiras - 4o periodo"
	Then a new folder named "Cadeiras - 4o periodo" will be created in the page "Minha Biblioteca"

Scenario: Adding new folder with repeated name
	Given I'm logged in as "Student" with username "Marcela" and password "1234" 
	And I'm in the page "Minha Biblioteca"
	And there's already a folder named "Cadeiras - 4o periodo"
	When I press the "Nova pasta" button
	And I type the name "Cadeiras - 4o periodo"
	Then an error message appears
	And no new folder is created

