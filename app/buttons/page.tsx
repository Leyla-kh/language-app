import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
  return (
    <div className="flex flex-col w-80 gap-5 m-10">
      <Button>default</Button>
      <Button variant="primary">primary</Button>
      <Button variant="primaryOutline">primary Outline</Button>
      <Button variant="secondary">secondary </Button>
      <Button variant="secondaryOutline">secondary Outline</Button>
      <Button variant="danger">danger </Button>
      <Button variant="dangerOutline">danger Outline</Button>
      <Button variant="super">super </Button>
      <Button variant="superOutline">super Outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="sidebar">sidebar </Button>
      <Button variant="sidebarOutline">sidebar Outline</Button>
    </div>
  );
};

export default ButtonsPage;
