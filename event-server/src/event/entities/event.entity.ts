import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity('event')
export class Event {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({name:'eventType'})
    eventType: string;

    @Column({name:'condition'})
    condition: string;
    
    @Column({name:'startDate'})
    startDate: Date;
    
    @Column({name:'endDate'})
    endDate: Date;

    @Column({name:'isActive'})
    isActive: boolean;
}
