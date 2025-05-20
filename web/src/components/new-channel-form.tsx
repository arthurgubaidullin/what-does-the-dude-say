import type { ChannelsService } from '@what-does-the-dude-say/interfaces';

export const NewChannelForm = (props: { channels: ChannelsService }) => {
  const { channels } = props;

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-3xl">New Channel Form</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.currentTarget;

          const formData = new FormData(form);

          const name = formData.get('name');

          if (typeof name !== 'string') {
            throw new TypeError();
          }

          channels.add({ name });

          form.reset();
        }}
      >
        <div className="grid gap-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              What twitch channel do you want to add?
            </legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              name="name"
              autoComplete="off"
              required
            />
            <p className="label">Required</p>
          </fieldset>
          <div>
            <input className="btn btn-primary" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};
