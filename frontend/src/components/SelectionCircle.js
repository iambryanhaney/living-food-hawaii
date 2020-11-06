import React from 'react'

export default function SelectionCircle ({group, updateFilters, tags, filters, activeCircle}) {
    
    const sortTagNames = (group, nameA, nameB) => {
        // MEALS are sorted by time of day via lookup table.
        // EVENTS are sorted in a specific order (Abby's preference) via lookup table.
        const customOrder = {
            'breakfast': 0,
            'lunch': 1,
            'dinner': 2,
            'retreats': 0,
            'private parties': 1,
            'weddings': 2,
            'supper club': 3,
        }
        if (group === 'meals') return customOrder[nameA] - customOrder[nameB]
        else if (group === 'events') return customOrder[nameA] - customOrder[nameB] 
        else return nameA.localeCompare(nameB)
    }

    // Convert lowercase tag names to titles
    const titleCase = name => name.split(' ').map(name => name[0].toUpperCase() + name.slice(1)).join(' ')

    // Map tags to filter-item divs inside of filter menus, sorted alphabetically and capitalized. 
    // Render selected filter if applicable
    const menuTags = tags.filter(tag => tag.group === group)
    return (
        <div className="filter-container">
            <div className={`filter-circle ${activeCircle ? 'active-circle' : ''}`}>
                <p >{ titleCase(group) }</p>
                <div className="filter-menu-bridge"></div>
                <div className="filter-menu bg-light" style={{ top: `${-menuTags.length*0.35}rem`}} >
                    { menuTags.filter(tag => tag.group === group).sort((a,b) => sortTagNames(group, a.name, b.name)).map(tag =>
                        <div className="filter-item" key={tag.name} onClick={(e) => updateFilters(group, tag.name)}>{titleCase(tag.name)}</div>
                    )}
                </div>
            </div>
            <div className="filter-selected" onClick={() => updateFilters(group, null)}>
                    { filters[group] && <div>#{titleCase(filters[group])}</div> } 
                    { filters[group] && <i className="far fa-times-circle filter-closeBtn"/> }
            </div>
        </div>
    )
}