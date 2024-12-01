import type { ChannelService } from '../services/channel';

export const ChangeChannelForm = (props: { channel: ChannelService }) => {
  return (
    <section class="grid gap=4">
      <h2 class="text-5xl">Change channel</h2>

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
        class="grid gap-4"
      >
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">What is your channel?</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            class="input input-bordered w-full"
            required
            value={props.channel.name}
            autoComplete="off"
          />
        </label>

        <div>
          <input class="btn" type="submit" />
        </div>
      </form>
    </section>
  );
};
