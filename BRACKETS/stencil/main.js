define(
    function ( require, exports, module )
    {
        "use strict";

        // ~~

        function IsLowerCase(
            text
            )
        {
            return text == text.toLowerCase();
        }

        // ~~

        function IsUpperCase(
            text
            )
        {
            return text == text.toUpperCase();
        }

        // ~~

        function IsPascalCase(
            text
            )
        {
            if ( text.length < 2 )
            {
                return false;
            }
            else
            {
                return (
                    IsUpperCase( text[ 0 ] )
                    && IsLowerCase( text[ 1 ] )
                    );
            }
        }

        // ~~

        function GetMinorCase(
            text
            )
        {
            if ( text.length <= 1 )
            {
                return text.toLowerCase();
            }
            else
            {
                return text[ 0 ].toLowerCase() + text.substring( 1);
            }
        }

        // ~~

        function GetMajorCase(
            text
            )
        {
            if ( text.length <= 1 )
            {
                return text.toUpperCase();
            }
            else
            {
                return text[ 0 ].toUpperCase() + text.substring( 1 );
            }
        }

        // ~~

        function GetSnakeCase(
            text
            )
        {
            var
                character,
                character_index,
                prior_character,
                snake_case_text;

            if ( text.length == 0 )
            {
                return "";
            }
            else
            {
                snake_case_text = "";
                character = "";

                for ( character_index = 0;
                      character_index < text.length;
                      ++character_index )
                {
                    prior_character = character;
                    character = text[ character_index ];

                    if ( ( ( prior_character >= 'a' && prior_character <= 'z' )
                             && ( ( character >= 'A' && character <= 'Z' )
                                  || ( character >= '0' && character <= '9' ) ) )
                           || ( ( prior_character >= '0' && prior_character <= '9' )
                                && ( ( character >= 'a' && character <= 'z' )
                                     || ( character >= 'A' && character <= 'Z' ) ) ) )
                    {
                        snake_case_text += '_';
                    }

                    snake_case_text += character;
                }

                return snake_case_text.toLowerCase();
            }
        }

        // ~~

        function GetPascalCase(
            text
            )
        {
            var
                word_array,
                word_index;

            if ( text.length == 0 )
            {
                return "";
            }
            else
            {
                word_array = text.toLowerCase().split( '_' );

                for ( word_index = 0;
                      word_index < word_array.length;
                      ++word_index )
                {
                    word_array[ word_index ] = GetMajorCase( word_array[ word_index ] );
                }

                return word_array.join( "" );
            }
        }

        // ~~

        function GetNewText(
            old_text,
            old_identifier_text,
            old_variable_is_replaced,
            old_attribute_is_replaced,
            old_type_is_replaced,
            new_identifier_text
            )
        {
            var
                old_attribute,
                old_identifier,
                old_identifier_array,
                old_identifier_index,
                old_type,
                old_variable,
                new_attribute,
                new_identifier,
                new_identifier_array,
                new_text,
                new_text_array,
                new_type,
                new_variable;

            old_identifier_array = old_identifier_text.trimRight().split( '\n' );
            new_identifier_array = new_identifier_text.trimRight().split( '\n' );

            new_text_array = [];

            while ( new_identifier_array.length >= old_identifier_array.length )
            {
                new_text = old_text;

                for ( old_identifier_index = 0;
                      old_identifier_index < old_identifier_array.length;
                      ++old_identifier_index )
                {
                    old_identifier = old_identifier_array[ old_identifier_index ];
                    new_identifier = new_identifier_array.shift();

                    if ( old_variable_is_replaced
                         || old_attribute_is_replaced
                         || old_type_is_replaced )
                    {
                        if ( IsPascalCase( old_identifier ) )
                        {
                            old_attribute = old_identifier;
                            old_variable = GetSnakeCase( old_attribute );
                            old_type = old_variable.toUpperCase();
                        }
                        else
                        {
                            old_variable = old_identifier.toLowerCase();
                            old_attribute = GetPascalCase( old_variable );
                            old_type = old_variable.toUpperCase();
                        }

                        if ( IsPascalCase( new_identifier ) )
                        {
                            new_attribute = new_identifier;
                            new_variable = GetSnakeCase( new_attribute );
                            new_type = new_variable.toUpperCase();
                        }
                        else
                        {
                            new_variable = new_identifier.toLowerCase();
                            new_attribute = GetPascalCase( new_variable );
                            new_type = new_variable.toUpperCase();
                        }

                        if ( old_variable_is_replaced )
                        {
                            new_text = new_text.split( old_variable ).join( new_variable );
                        }

                        if ( old_attribute_is_replaced )
                        {
                            new_text = new_text.split( old_attribute ).join( new_attribute );
                        }

                        if ( old_type_is_replaced )
                        {
                            new_text = new_text.split( old_type ).join( new_type );
                        }
                    }
                    else
                    {
                        new_text = new_text.split( old_identifier ).join( new_identifier );
                    }
                }

                new_text_array.push( new_text );
            }

            return new_text_array.join( "" );
        }

        // ~~

        function SetOldIdentifiers()
        {
            var
                editor;

            editor = editor_manager.getFocusedEditor();

            if ( editor )
            {
                old_identifier_text = editor._codeMirror.getSelections().join( "\n" );
            }
        }

        // ~~

        function SetNewIdentifiers()
        {
            var
                editor;

            editor = editor_manager.getFocusedEditor();

            if ( editor )
            {
                new_identifier_text = editor._codeMirror.getSelections().join( "\n" );
            }
        }

        // ~~

        function ApplyIdentifiers()
        {
            var
                editor,
                old_text_array,
                new_text_array;

            editor = editor_manager.getFocusedEditor();

            if ( editor )
            {
                old_text_array = editor._codeMirror.getSelections();

                new_text_array
                    = old_text_array.map(
                        function( old_text )
                        {
                            return (
                                GetNewText(
                                    old_text,
                                    old_identifier_text,
                                    old_variable_is_replaced,
                                    old_attribute_is_replaced,
                                    old_type_is_replaced,
                                    new_identifier_text
                                    )
                                );
                        }
                        );

                editor._codeMirror.replaceSelections( new_text_array );
            }
        }

        // ~~

        var
            editor_manager,
            command_manager,
            key_binding_manager,
            menu_manager,
            menu,
            set_old_identifiers_command_id,
            set_new_identifiers_command_id,
            apply_identifiers_command_id,
            new_identifier_text,
            new_text,
            old_attribute_is_replaced,
            old_identifier_text,
            old_type_is_replaced,
            old_variable_is_replaced;

        editor_manager = brackets.getModule( "editor/EditorManager" ),
        command_manager = brackets.getModule( "command/CommandManager" ),
        key_binding_manager = brackets.getModule( "command/KeyBindingManager" ),
        menu_manager = brackets.getModule( "command/Menus" );

        old_identifier_text = "";
        new_identifier_text = "";

        old_variable_is_replaced = true;
        old_attribute_is_replaced = true;
        old_type_is_replaced = true;

        set_old_identifiers_command_id = "senselogic.brackets.stencil.SetOldIdentifiers",
        set_new_identifiers_command_id = "senselogic.brackets.stencil.SetNewIdentifiers",
        apply_identifiers_command_id = "senselogic.brackets.stencil.ApplyIdentifiers";

        command_manager.register(
            "SetOldIdentifiers",
            set_old_identifiers_command_id,
            function()
            {
                SetOldIdentifiers();
            }
            );

        command_manager.register(
            "SetNewIdentifiers",
            set_new_identifiers_command_id,
            function()
            {
                SetNewIdentifiers();
            }
            );

        command_manager.register(
            "ApplyIdentifiers",
            apply_identifiers_command_id,
            function()
            {
                ApplyIdentifiers();
            }
            );

        key_binding_manager.addBinding( set_old_identifiers_command_id, "Ctrl-Alt-A" );
        key_binding_manager.addBinding( set_new_identifiers_command_id, "Ctrl-Alt-Z" );
        key_binding_manager.addBinding( apply_identifiers_command_id, "Ctrl-Alt-Q" );

        menu = menu_manager.getContextMenu( menu_manager.ContextMenuIds.EDITOR_MENU );
        menu.addMenuDivider();
        menu.addMenuItem( set_old_identifiers_command_id );
        menu.addMenuItem( apply_identifiers_command_id );
    }
    );
