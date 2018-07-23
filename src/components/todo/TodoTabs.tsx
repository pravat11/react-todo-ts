import * as React from 'react';
import { connect } from 'react-redux';

import AppState from '../../domain/state';
import { fetchTodos } from '../../actions/todoActions';
import VisibilityFilters from '../../enum/VisibilityFilters';
import { setVisibilityFilter } from '../../actions/visibilityFilters';

interface MappedProps {
  activeFilterId: number;
}

interface DispatchedProps {
  fetchTodos: (filterId: number) => void;
  setVisibilityFilter: (filterId: number) => void;
}

type TodoTabsProps = MappedProps & DispatchedProps;

const visibilityFilterIdToNameMap = {
  [VisibilityFilters.ALL]: 'all',
  [VisibilityFilters.ACTIVE]: 'active',
  [VisibilityFilters.COMPLETED]: 'completed'
};

const TodoTabs = (props: TodoTabsProps) => {
  const { activeFilterId } = props;

  const handleTabChange = (filterId: number) => {
    props.setVisibilityFilter(+filterId);
    props.fetchTodos(+filterId);
  };

  return (
    <div>
      {Object.keys(visibilityFilterIdToNameMap).map(filter => (
        <button
          key={`tab-button-${filter}`}
          className={'todo-tabs ' + (activeFilterId === +filter && 'active')}
          onClick={() => handleTabChange(+filter)}
        >
          {visibilityFilterIdToNameMap[filter]}
        </button>
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  activeFilterId: state.app.ui.activeFilter
});

const mapDispatchToProps = {
  fetchTodos,
  setVisibilityFilter
};

export default connect<MappedProps, DispatchedProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(TodoTabs);

// import * as React from 'react';
// import { connect } from 'react-redux';

// import AppState from '../../domain/state';
// import { fetchTodos } from '../../actions/todoActions';
// import VisibilityFilters from '../../enum/VisibilityFilters';
// import { setVisibilityFilter } from '../../actions/visibilityFilters';

// interface MappedProps {
//   activeFilterId: number;
// }

// interface DispatchedProps {
//   fetchTodos: (filterId: number) => void;
//   setVisibilityFilter: (filterId: number) => void;
// }

// type TodoTabsProps = MappedProps & DispatchedProps;

// const visibilityFilterIdToNameMap = {
//   [VisibilityFilters.ACTIVE]: 'active',
//   [VisibilityFilters.COMPLETED]: 'completed',
//   [VisibilityFilters.ALL]: 'all'
// };

// const TodoTabs = (props: TodoTabsProps) => {
//   const { activeFilterId } = props;

//   const handleTabChange = (filterId: number) => {
//     props.setVisibilityFilter(+filterId);
//     props.fetchTodos(+filterId);
//   };

//   return (
//     <div>
//       {Object.keys(visibilityFilterIdToNameMap).map(filter => (
//         <button
//           key={`tab-button-${filter}`}
//           className={'todo-tabs ' + (activeFilterId === +filter && 'active')}
//           onClick={() => handleTabChange(+filter)}
//         >
//           {visibilityFilterIdToNameMap[filter]}
//         </button>
//       ))}
//     </div>
//   );
// };

// const mapStateToProps = (state: AppState) => ({
//   activeFilterId: state.app.ui.activeFilter
// });

// const mapDispatchToProps = {
//   fetchTodos,
//   setVisibilityFilter
// };

// export default connect<MappedProps, DispatchedProps, {}>(
//   mapStateToProps,
//   mapDispatchToProps
// )(TodoTabs);
