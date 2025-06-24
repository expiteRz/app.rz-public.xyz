type ListType = {
  exactId: number;
  label: string;
};

/**
 * Any parameter needed for initial setting
 * @param id - Attribute to identify a single element. For this project, the attribute is needed to update the element
 * @param list - Attach the selectable values
 * @param selectedIndex - Index to selected value from list
 */
export default <T extends string & ListType>({
  id,
  list = [],
  selectedIndex = 0,
}: {
  id: string;
  list: T[];
  selectedIndex: number;
}) => <></>;
