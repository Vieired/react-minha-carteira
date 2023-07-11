export const SelectStyles = {
    container: (provided: any) => ({
        ...provided,
        width: '100%'
    }),
    control: (provided: any, state: any) => ({
      ...provided,
    //   width: '100%',
      border: `1px solid var(--secondary)`,
    //   fontFamily: 'Oswald, sans-serif',
    //   borderRadius: '4px',
      padding: '0',
    //   fontSize: '0.9rem',
    //   boxShadow: state.selectProps.invalid
    //     ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 8px rgba(102, 55, 55, 0.6)'
    //     : state.isFocused
    //     ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 8px rgba(102, 175, 233, 0.6)'
    //     : 'unset',
       boxShadow: 'none',
    //   minHeight: '50px',    
      '&:hover': {
        ...provided['&:hover'],
        borderColor: 'var(--secondary)',
      },
      '&:focused': {
        ...provided['&:focused'],
        borderColor: 'var(--secondary)',
      },      
    //   alignContent: 'flex-start',
    }),
    // indicatorSeparator: () => ({
    //   display: 'none',
    // }),
    // indicatorsContainer: provided => ({
    //   ...provided,
    //   marginRight: '10px',
    // }),
    // dropdownIndicator: (provided: any) => ({
    //   ...provided,
    //   padding: 'var(--space-x-small)',
    //   color: '#333',
    //   display: 'none',
    // }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 8px',
      textAlign: 'left',
    }),
    menu: (provided: any) => ({
      ...provided,
      width: "max-content",
      minWidth: "100%",
      textAlign: 'left',
    //   zIndex: 100,
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '200px'
    //   fontSize: '0.9rem',
    }),
};