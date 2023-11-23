import { Component, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../_services/event.service';
import { UserService } from '../_services/user.service';
import { EventInput, Event } from '../_interfaces/types';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  closeResult = '';
  events: Array<Event> = []
  event: EventInput = {
    name: '',
    type: 'Meetup',
    location: '',
    date: new Date(),
    time: '',
    description: '',
    participants: []
  };
  participantsList = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  loading: boolean = false

  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.loading = true
    this.userService.getConnections()
      .then((response) => {
        const connections = response.data.connections;

        this.participantsList = connections.map((con: any) => {
          return {
            item_id: con._id,
            item_text: `${con.firstName} ${con.lastName}`
          }
        })

        this.eventService.getAllEvents()
          .then((response) => {
            this.events = response.data

            this.loading = false
          })
      })
  }

  createEvent(): void {
    this.event.participants = this.event.participants.map((p: any) => p.item_id)
    this.event.participants.push(this.authService.getUser()._id)
    // this.event.date = new Date(this.event.date)
    this.eventService.createEvent(this.event)
      .then((response) => {
        window.location.reload()
      })
      .catch((err) => {
        this.toastService.error('Something went wrong. Plese try again')
      })
  }

  getEventIcon (type: String) {
    if (type == 'Study') {
      return "fa-solid fa-book"
    } else if (type == 'Trip') {
      return "fa-solid fa-person-walking-arrow-right"
    }

    return "fa-solid fa-handshake"
  }

  getEventParticipants(participants: Array<any>) {
    return participants.map((p: any) => {
      const participant: any = this.participantsList.find((par: any) => par.item_id == p)

      if (participant) {
        return participant.item_text
      }

      return 'You';
    })
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    })
	}
}
