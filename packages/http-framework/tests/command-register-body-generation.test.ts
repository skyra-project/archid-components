describe('User Context Menu Command', () => {
	// Should be straightforward because there are no subcommands and no options

	test('GIVEN new instance of ContextMenuCommandBuilder THEN returns expected body', () => {
		// Use "new ContextMenuCommandBuilder()" to create a new instance of SlashCommandBuilder
		// Then expect the body
	});

	test('GIVEN ContextMenuCommandBuilder callback THEN returns expected body', () => {
		// Use (builder) => builder.setName(...) etc
	});

	test('GIVEN command with raw object THEN returns expected body', () => {
		// Just a JSON object
	});
});

describe('Message Context Menu Command', () => {
	// Should be straightforward because there are no subcommands and no options

	test('GIVEN new instance of ContextMenuCommandBuilder THEN returns expected body', () => {
		// Use "new ContextMenuCommandBuilder()" to create a new instance of SlashCommandBuilder
		// Then expect the body
	});

	test('GIVEN ContextMenuCommandBuilder callback THEN returns expected body', () => {
		// Use (builder) => builder.setName(...) etc
	});

	test('GIVEN command with raw object THEN returns expected body', () => {
		// Just a JSON object
	});
});

describe('Chat Input Commands', () => {
	describe('Command without options', () => {
		test('GIVEN command without options THEN returns expected body', () => {
			// Just name and description
		});
	});

	describe('Command using SlashCommandBuilder', () => {
		test('GIVEN new instance of SlashCommandBuilder THEN returns expected body', () => {
			// Use "new SlashCommandBuilder()" to create a new instance of SlashCommandBuilder
			// Then expect the body
		});

		test('GIVEN SlashCommandBuilder callback THEN returns expected body', () => {
			// Use (builder) => builder.setName(...) etc
		});
	});

	describe('Command with options', () => {
		test('GIVEN all option types THEN returns expected body', () => {
			// Test where the command has all different command options. That way we can test all the different types in the same test.
		});

		test('GIVEN option with autocomplete THEN returns expected body', () => {
			// Test where the command has an autocomplete option.
		});

		test('GIVEN required string option THEN returns expected body', () => {
			// Test where the command has a required string option.
		});

		test('GIVEN string, integer and number choices THEN returns expected body', () => {
			// Test where the command has a string choices, integer choices and number choices options.
		});
	});

	describe('Command with subcommands', () => {
		test('GIVEN command with a single subcommand THEN returns expected body', () => {
			// Test with a single subcommand (not like that has any practical use but we should support it anyway)
		});

		test('GIVEN command with multiple subcommands THEN returns expected body', () => {
			// Test with multiple subcommands
		});
	});

	describe('Command with subcommand group and subcommands', () => {
		test('GIVEN command with single subcommand group and single subcommand THEN returns expected body', () => {
			// Test with a single subcommand group and single subcommand
		});

		test('GIVEN command with single subcommand group and multiple subcommands THEN returns expected body', () => {
			// Test with a single subcommand group and multiple subcommands
		});
	});

	describe('Command with multiple subcommand groups and subcommands', () => {
		test('GIVEN command with multiple subcommand groups and single subcommand THEN returns expected body', () => {
			// Test with multiple subcommand groups and single subcommand
		});

		test('GIVEN command with multiple subcommand groups and multiple subcommands THEN returns expected body', () => {
			// Test with multiple subcommand groups and multiple subcommands
		});
	});
});
