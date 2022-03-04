import React, {Component} from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css'

const API_BASE_URL = "https://deckofcardsapi.com/api/deck/"

class Decks extends Component{
    constructor(props){
        super(props);
        this.state = {
            deck: null,
            drawn: []
        }
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount(){
        let deck = await axios.get(`${API_BASE_URL}new/shuffle/`);
        this.setState({deck: deck.data})
    }

    async getCard(){
        let id = this.state.deck.deck_id;
        
        try {
            let cardURL = `${API_BASE_URL}${id}/draw/`
            let response = await axios.get(cardURL)
            let card = response.data.cards[0];

            if(!response.data.success){
                throw new Error('No Remaining Card')
            }
            this.setState(st => ({
                drawn: [...st.drawn, {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} of ${card.suit}`
                }]   
            }))

        } catch (err) {
            alert(err)
        }
    }

    render(){
        let cards = this.state.drawn.map(card => (
            <Card key={card.id} image={card.image} name={card.name} />
        ))
        return(
            <div>
                <h1 className='Deck-title'>Card Dealer</h1>
                <h2 className='Deck-title subtitle'>A little demo made with React</h2>
                <button className='Deck-btn' onClick={this.getCard}>Get Card!</button>
                
                <div className='Deck-cardarea'>
                    {cards}
                </div>
            </div>
        )
    }
}

export default Decks;