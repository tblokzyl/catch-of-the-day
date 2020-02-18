import React from 'react';

class EditFishForm extends React.Component {
  handleChange = (event) => {
    // Take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name] : event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    return <div className="fish-edit">
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" value={this.props.fish.name} onChange={this.handleChange} type="text" placeholder="Fish Name" />
        <input name="price" value={this.props.fish.price} onChange={this.handleChange} type="text" placeholder="Fish Price" />
        <select name="status" value={this.props.fish.status} onChange={this.handleChange}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={this.props.fish.desc} onChange={this.handleChange} placeholder="Fish Description"></textarea>
        <input name="image" value={this.props.fish.image} onChange={this.handleChange} type="text" placeholder="Fish Image" />
        <button type="submit" onClick={() => this.props.deleteFish(this.props.index)}>+ Remove Fish</button>
      </form>
    </div>
  }
}

export default EditFishForm;