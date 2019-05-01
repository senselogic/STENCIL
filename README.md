![](https://github.com/senselogic/STENCIL/blob/master/LOGO/stencil.png)

# Stencil

Code instantiator.

## Description

Stencil interactively instantiates code variations based on a reference implementation.

## Sample

Old identifiers :

```
User
```

New identifiers :

```
Article
Section
Comment
```

Old text :

```
void AddUser(
    USER user
    )
{
    if ( user != null )
    {
        DATABASE.GetInstance().AddUser( user );
    }
}

// ~~

```

New text :

```
void AddArticle(
    ARTICLE article
    )
{
    if ( article != null )
    {
        DATABASE.GetInstance().AddArticle( article );
    }
}

// ~~

void AddSection(
    SECTION section
    )
{
    if ( section != null )
    {
        DATABASE.GetInstance().AddSection( section );
    }
}

// ~~

void AddComment(
    COMMENT comment
    )
{
    if ( comment != null )
    {
        DATABASE.GetInstance().AddComment( comment );
    }
}

// ~~

```

## Standalone tool

*   Open `stencil.html` in a web browser
*   Type the **old identifiers**
*   Type the **new identifiers**
*   Paste the **old text**
*   Click on `Stencil`
*   Copy the **new text**

## Brackets extension

*   Install the `stencil` extension in the extension
*   Select the **old identifiers**
*   Press `Ctrl-Alt-A`
*   Select the **new identifiers**
*   Press `Ctrl-Alt-Z`
*   Select the **old text**
*   Press `Ctrl-Alt-Q`

## Version

1.0

## Author

Eric Pelzer (ecstatic.coder@gmail.com).

## License

This project is licensed under the GNU General Public License version 3.

See the [LICENSE.md](LICENSE.md) file for details.
