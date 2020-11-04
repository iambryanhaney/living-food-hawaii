import React from 'react'

export default function SelectionCircle ({group, updateFilters, tags, filters}) {
    // MEALS are sorted by time of day, rather than alphabetically, by comparing the 4th character */
    const sortTagNames = (group, nameA, nameB) => {
        if (group == 'meals') {
            nameA = nameA[3]
            nameB = nameB[3]
        } 
        return nameA.localeCompare(nameB)
    }

    // Convert lowercase tag names to titles
    const tagNameTitleCase = name => name.split(' ').map(name => name[0].toUpperCase() + name.slice(1)).join(' ')

    // Map tags to filter-item divs inside of filter menus, sorted alphabetically and capitalized. 
    // Render selected filter if applicable
    const menuTags = tags.filter(tag => tag.group === group)
    return (
        <div className="filter-container">
            <div className="filter-circle">
                { group[0].toUpperCase() + group.slice(1) }
                <div className="filter-menu bg-light" style={{ top: `${-menuTags.length*0.35}rem`}} >
                    { menuTags.filter(tag => tag.group === group).sort((a,b) => sortTagNames(group, a.name, b.name)).map(tag =>
                        <div className="filter-item" key={tag.name} onClick={(e) => updateFilters(group, tag.name)}>{tagNameTitleCase(tag.name)}</div>
                    )}
                </div>
            </div>
            <div className="filter-selected" onClick={() => updateFilters(group, '')}>
                    { filters[group] && <div>#{tagNameTitleCase(filters[group])}</div> } 
                    { filters[group] && <i className="far fa-times-circle filter-closeBtn"/> }
            </div>
        </div>
    )
}