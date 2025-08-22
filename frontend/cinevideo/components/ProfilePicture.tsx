interface ProfilePictureProps {
    imageUrl: string;
  }
  
  export default function ProfilePicture({ imageUrl }: ProfilePictureProps) {
    return (
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={imageUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
      </div>
    );
  }