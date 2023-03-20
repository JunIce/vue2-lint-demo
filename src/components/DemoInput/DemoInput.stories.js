import DemoInput from "./index.vue";
import { Meta, Story } from "@storybook/vue";

export default {
  title: "DemoInput",
  component: DemoInput,
  argTypes: {
    label: {
      name: "label",
      description: "标题",
      control: {
        type: "text",
      },
    },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  components: { DemoInput },
  template: `<DemoInput v-bind="$props"></DemoInput>`,
});

export const Default = Template.bind({});

Default.args = {
  label: "Username",
};
