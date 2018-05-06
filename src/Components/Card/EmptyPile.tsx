import * as React from 'react';

export class EmptyPile extends React.Component <{}, {}> {
  public render() {
    return (
        <svg width="140" height="190">
            <rect width="100" height="150" x="20" y="20" style={{strokeWidth: 3, stroke: "green", fillOpacity: 0}} />
        </svg>
    );
  }
}
