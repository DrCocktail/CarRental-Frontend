import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { Card } from '../../../models/card';
import { LocalStorageService } from '../../../services/local-storage.service';
import { User } from 'src/app/models/Users/user';

@Component({
  selector: 'app-card-saved',
  templateUrl: './card-saved.component.html',
  styleUrls: ['./card-saved.component.css'],
})
export class CardSavedComponent implements OnInit {
  cards: Card[];
  currentUser: User;
  @Output() selectedCard: EventEmitter<Card> = new EventEmitter<Card>();

  constructor(
    private cardService: CardService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = Object.assign(
      {},
      this.localStorageService.getCurrentUser()
    );
    this.getCardsByCustomerId(this.currentUser.userId);
  }

  getCardsByCustomerId(customerId: number) {
    this.cardService.getByCustomerId(customerId).subscribe((response) => {
      this.cards = response.data;
    });
  }

  selectCard(cardId: number) {
    let selectedCard = this.cards.find((card) => card.cardId == cardId);

    let newSelectedCard: Card = {
      cardId: selectedCard.cardId,
      cardNameSurname: selectedCard.cardNameSurname,
      cardNumber: selectedCard.cardNumber,
      validDate: selectedCard.validDate,
      customerId: selectedCard.customerId,
      cvv: selectedCard.cvv,
    };

    this.selectedCard.emit(newSelectedCard);
  }
}
