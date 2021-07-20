import React, {ChangeEvent} from "react";

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}
type ProfileStateType = {
    editMode: boolean,
    status: string
}
// should be deleted, ProfileStatusWithHooks exists
export class ProfileStatus extends React.Component<ProfileStatusType> {
    state : ProfileStateType = {
        editMode: false,
        status: this.props.status
    }
    actiateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);

    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<ProfileStateType>, snapshot?: any) {
       if(prevProps.status!== this.props.status){
           this.setState({
               status: this.props.status
           })
       }

    }

    render() {
        return (
            <>
                {!this.state.editMode
                    ?
                    <div>
                        <span onDoubleClick={() => this.actiateEditMode()}>{this.props.status || 'no status'}</span>
                    </div>
                    :
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} value={this.state.status}
                               onBlur={() => this.deactivateEditMode()}/>
                    </div>}
            </>
        )
    }
}