/***************************************************************************
 Name: Mayur Khatri, mayur_khatri@student.cs.uml.edu
 Computer Science Student, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/2018/mkhatri/public_html/461f2017/hw4/App.js
 Created: 11-nov-2017
 Last updated by HL: 11-nov-2017, 17:51
 Description: JSX single-page app for the dynamic car comparator with table
****************************************************************************/

import React, { Component } from 'react';
import Button from 'material-ui/Button';

class App extends Component {
  // State holds the states of the input fields to be updated whenever the user has keyboard input
  // Here we also have a state for the current page state, and also to display the table
  state = {
    current: 'home', // The home page where the user first enters their car price/gas price
    milesDriven: '',
    costPerGallon: '',
    carPrice1: '',
    carPrice2: '',
    carPrice3: '',
    carPrice4: '',
    prices: [], // The array for the prices of the cars
    mpgTableArray: [], // The array for the table which holds the values 
    milesPerGallon: '',
    displayTable: { display: 'none' },
    errors: {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: [e.target.value] }) // Changes the specified targets state value
  }

  home = (e) => {
    e.preventDefault()
    const {
      milesDriven,
      costPerGallon,
      errors
    } = this.state
    if(milesDriven === '') {
      errors.milesDriven = " Miles driven field cannot be empty"
      if (milesDriven !== '') {
        this.setState({ errors: {milesDriven: null} })
      }
    }
    else if(costPerGallon === '') {
      errors.costPerGallon = " Cost per gallon field cannot be empty"
      if (costPerGallon !== '') {
        this.setState({ errors: {milesDriven: null} })
      }
    }
    if(Object.keys(errors).length === 0) {
      this.setState({ current: 'carPricesContent' })
    } else {
      this.setState({ errors }) // Updates the errors state to display error messages if input fields are empty
    }
  }
  
  calculateCarPrices = (e) => {
    e.preventDefault()
    let {
      carPrice1,
      carPrice2,
      carPrice3,
      carPrice4,
      prices,
      errors
    } = this.state
    if(carPrice1 === '') {
      errors.carPrice1 = " Car price 1 field cannot be empty"
    }
    else if(carPrice2 === '') {
      errors.carPrice2 = " Car price 2 field cannot be empty"
    }
    else if(carPrice3 === '') {
      errors.carPrice3 = " Car price 3 field cannot be empty"
    }
    else if(carPrice4 === '') {
      errors.carPrice4 = " Car price 4 field cannot be empty"
    }
    if(Object.keys(errors).length === 0) {
      prices.push(carPrice1, carPrice2, carPrice3, carPrice4)
      this.setState({ prices, current: 'milesPerGallonContent', displayTable: {} })
    } else {
      this.setState({ errors }) // Updates the errors state to display error messages if input fields are empty
    }
  }

  calculateMPGCost = (e) => {
    e.preventDefault()
    let {
      mpgTableArray,
      milesPerGallon,
      milesDriven,
      costPerGallon,
      prices,
      errors
    } = this.state
    if(milesPerGallon === '') {
      errors.milesPerGallon = " Miles per gallon field cannot be empty"
    }
    if(Object.keys(errors).length === 0) {
      prices = prices.map((price, i) => {
        const total = Math.round(Number(price) + ((Number(milesDriven) / Number(milesPerGallon)) * Number(costPerGallon)))
        let perMile = total / Number(milesDriven)
        perMile.toFixed(2)
        return {
          total, perMile
        }
      })
      mpgTableArray.push({
        value: milesPerGallon,
        totals: prices
      }) // After finishing the above calculations, append the values to the table array
      this.setState({
        mpgTableArray,
        milesPerGallon: ''
      })
    } else {
      this.setState({ errors }) // Updates the errors state to display error messages if input fields are empty
    }
  }

  render() {
    // Home content which has container for the first options for miles/fuel price
    const home = (
      <div className="formContainer">
        <h1 className="d-flex justify-content-center">Dynamic Car Comparator</h1>
        <hr/>
        <form className="formContent">
          <div className="form-group">
            <label htmlFor="milesDriven">Expected Miles Driven</label>
            <input 
              type="number" 
              onChange={this.onChange} 
              value={this.state.milesDriven} 
              className="form-control" 
              name="milesDriven"/>
            {this.state.errors.milesDriven && <span>{this.state.errors.milesDriven}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="costPerGallon">Gas Price ($)</label>
            <input 
              type="number" 
              onChange={this.onChange} 
              value={this.state.costPerGallon} 
              className="form-control" 
              name="costPerGallon"/>
            {this.state.errors.costPerGallon && <span>{this.state.errors.costPerGallon}</span>}
          </div>
          <div className="d-flex justify-content-center">
            <Button onClick={this.home} raised>Next</Button>
          </div>
        </form>
      </div>
    )
    // Car content which has container for the car prices
    const carPricesContent = (
      <div className="carPricesContainer">
        <h3 className="d-flex justify-content-center">Please enter 3 different car prices: </h3>
        <form className="carPricesContent">
          <div className="form-group">
            <label htmlFor="carPrice1">Car Price: 1 ($)</label>
            <input 
              type="number" 
              onChange={this.onChange} 
              value={this.state.carPrice1} 
              className="form-control" 
              name="carPrice1"/>
            {this.state.errors.carPrice1 && <span>{this.state.errors.carPrice1}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="carPrice2">Car Price: 2 ($)</label>
            <input 
              type="number" 
              onChange={this.onChange} 
              value={this.state.carPrice2} 
              className="form-control" 
              name="carPrice2"/>
            {this.state.errors.carPrice2 && <span>{this.state.errors.carPrice2}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="carPrice3">Car Price: 3 ($)</label>
            <input 
              type="number" 
              onChange={this.onChange} 
              value={this.state.carPrice3} 
              className="form-control" 
              name="carPrice3"/>
            {this.state.errors.carPrice3 && <span>{this.state.errors.carPrice3}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="carPrice4">Car Price: 4 ($)</label>
            <input 
              type="number" 
              onChange={this.onChange} 
              value={this.state.carPrice4} 
              className="form-control" 
              name="carPrice4"/>
            {this.state.errors.carPrice4 && <span>{this.state.errors.carPrice4}</span>}
          </div>
          <div className="d-flex justify-content-center">
            <Button onClick={this.calculateCarPrices} raised>Next</Button>
          </div>
        </form>
      </div>
    )
    // MPG container which has the calculate for different MPG for the table array
    const milesPerGallonContent = (
    <div className="mpgContainer">
      <h3 className="d-flex justify-content-center">Please enter the MPG you would like compared: </h3>
      <form className="mpgContent" onSubmit={this.calculateMPGCost}>
        <div className="form-group">
          <label htmlFor="milesPerGallon">Miles Per Gallon</label>
          <input 
            type="number" 
            onChange={this.onChange} 
            value={this.state.milesPerGallon} 
            className="form-control" 
            name="milesPerGallon"/>
          {this.state.errors.milesPerGallon && <span>{this.state.errors.milesPerGallon}</span>}
        </div>
        <div className="d-flex justify-content-center">
          <Button onClick={this.calculateMPGCost} raised>Submit</Button>
        </div>
      </form>
    </div>
    )

    return (
      <div className="App">
        {/* Contains the current states of the page, each time you press next the page state is updated */}
        <div className="jumbotron container">
          <div className="container">
            {this.state.current === 'home' && home}
            {this.state.current === 'carPricesContent' && carPricesContent}
            {this.state.current === 'milesPerGallonContent' && milesPerGallonContent}
          </div>
        </div>
        {/* Updated state of the page shows the table for viewing */}
        <div className="card container" style={this.state.displayTable}>
          {/* Table key */}
          <div className="card-body">
            <h3 className="d-flex justify-content-center">Car Price vs Cost per Mile Table</h3>
            <hr/>
            <div className="card-text d-flex justify-content-center">The results are displayed in the table as [total car price / cost per mile]</div>
          </div>
          {/* Outter table values (Horizontally the price) */}
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <th className="blank">Cost/MPG</th>
                {
                  this.state.prices.map((price, i) => {
                    return (<th>${price}</th>)
                  })
                }
              </tr>
              {
                // Inner table values (vertically the MPG)
                this.state.mpgTableArray.map((milesPerGallon, i) => {
                  return (
                    <tr>
                      <th>{milesPerGallon.value} MPG</th>
                      {
                        milesPerGallon.totals.map((total, i) => {
                          return (
                            <td className="total">${total.total} / ${total.perMile.toFixed(2)}</td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;