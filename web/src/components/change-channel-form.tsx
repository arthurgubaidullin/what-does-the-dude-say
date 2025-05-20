import type { ChannelService } from '../services/channel';

export const ChangeChannelForm = (props: { channel: ChannelService }) => {
  return (
    <section className="grid gap=4">
      <h2 className="text-5xl">Change channel</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);

          const channel = formData.get('name');

          if (!channel || channel instanceof File) {
            return;
          }

          props.channel.select(channel);
        }}
        className="grid gap-4"
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">What is your channel?</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full"
            required
            value={props.channel.name}
            autoComplete="off"
          />
        </label>

        <div>
          <input className="btn" type="submit" />
        </div>
      </form>
    </section>
  );
};
