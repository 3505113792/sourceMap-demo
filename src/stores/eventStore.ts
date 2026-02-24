import {defineStore} from 'pinia'
import type {eventWithTime} from '@rrweb/types'
interface EventState{
    events:eventWithTime[]
}
export const useEventStore=defineStore('eventSTore',{
    state:():EventState=>({
        events:[]
    }),
    getters:{},
    actions:{
        setEvent(events:eventWithTime[]){
            this.events=events
        },
        getEvents(){
            return this.events
        }
    }
}
) as any