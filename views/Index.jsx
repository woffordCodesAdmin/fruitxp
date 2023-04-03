const React = require("react");
class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Fruits index page</h1>
        <ul>
          {this.props.fruits.map((fruit, i) => {
            return (
              <li key={i}>
                The {fruit.name} is {fruit.color}
                {fruit.readyToEat
                  ? `It is ready to eat`
                  : `It is not ready to eat`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
